import colors from 'colors';
import { Server } from 'socket.io';
import { logger } from '../shared/logger';
import { MessageService } from '../app/modules/message/message.service';

const socket = (io: Server) => {
  io.on('connection', socket => {
    logger.info(colors.blue(`A user connected: ${socket.id}`));

    // Join a conversation room
    socket.on('joinConversation', (conversationId: string) => {
      socket.join(conversationId);
      logger.info(
        colors.green(
          `Socket ${socket.id} joined conversation ${conversationId}`
        )
      );
    });

    // Handle sending a message
    socket.on('sendMessage', async data => {
      const { senderId, receiverId, content, type, media, conversationId } =
        data;

      try {
        // Save message via service (creates conversation if needed)
        const message = await MessageService.sendMessageService({
          senderId,
          receiverId,
          content,
          type,
          media,
          conversationId,
        });

        // Emit to all participants in the conversation
        io.to(message.conversationId.toString()).emit(
          'receiveMessage',
          message
        );
      } catch (err) {
        logger.error(colors.red('Error sending message:'), err);
      }
    });

    // Handle message updates
    socket.on('updateMessage', async ({ messageId, senderId, content }) => {
      try {
        const updated = await MessageService.updateMessageService(
          messageId,
          senderId,
          content
        );
        if (updated)
          io.to(updated.conversationId.toString()).emit(
            'updateMessage',
            updated
          );
      } catch (err) {
        logger.error(colors.red('Error updating message:'), err);
      }
    });

    // Handle message status updates (DELIVERED / READ)
    socket.on('updateMessageStatus', async ({ messageId, userId, status }) => {
      try {
        const updated = await MessageService.updateMessageStatusService(
          messageId,
          userId,
          status
        );
        if (updated)
          io.to(updated.conversationId.toString()).emit(
            'updateMessageStatus',
            updated
          );
      } catch (err) {
        logger.error(colors.red('Error updating message status:'), err);
      }
    });

    // Handle message deletion
    socket.on('deleteMessage', async ({ messageId, senderId }) => {
      try {
        const deleted = await MessageService.deleteMessageService(
          messageId,
          senderId
        );
        if (deleted)
          io.to(deleted.conversationId.toString()).emit(
            'deleteMessage',
            deleted
          );
      } catch (err) {
        logger.error(colors.red('Error deleting message:'), err);
      }
    });

    // Typing indicator
    socket.on('typing', ({ conversationId, senderId }) => {
      socket.to(conversationId).emit('typing', { senderId });
    });

    // Disconnect
    socket.on('disconnect', () => {
      logger.info(colors.red(`A user disconnected: ${socket.id}`));
    });
  });
};

export const socketHelper = { socket };
