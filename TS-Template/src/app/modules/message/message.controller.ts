import { Request, Response, NextFunction } from 'express';
import { MessageService } from './message.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { MESSAGE_STATUS } from './/message.interface';

// @apiend: api/v1/messages
// @method: post
const getOrcreateConversation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const { receiverId } = req.body;
    const data = {
      senderId: userId,
      receiverId,
    };
    const messages = await MessageService.getOrcreateConversation(data);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Messages fetched!',
      data: messages,
    });
  }
);
// @apiend: api/v1/messages
// @method: post
const sendMessage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id; // ✅ from auth middleware
    const { content, type, receiverId, conversationId } = req.body;
    if (!conversationId || !content) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Conversation ID and message text are required',
      });
    }

    // ✅ Build the message data
    const data = {
      senderId: userId,
      conversationId,
      receiverId,
      content,
      type,
      status: MESSAGE_STATUS.SENT,
    };

    // ✅ Save message in DB
    const message = await MessageService.sendMessageService(data);

    // Emit via Socket.IO
    const io = req.app.get('io');
    if (io)
      io.to(message.conversationId.toString()).emit('receiveMessage', message);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Message sent!',
      data: message,
    });
  }
);

// @apiend: api/v1/chat/:conversationId
// @method: get
const getMessages = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { conversationId } = req.params;
    const messages = await MessageService.getMessagesService(conversationId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Messages fetched!',
      data: messages,
    });
  }
);

// @apiend: api/v1/messages/:messageId
// @method: patch
const updateMessage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { messageId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const updated = await MessageService.updateMessageService(
      messageId,
      userId,
      content
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: updated
        ? 'Message updated!'
        : 'Message not found or not allowed',
      data: updated,
    });
  }
);

// @apiend: api/v1/messages/status/:messageId
// @method: patch
const updateMessageStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { messageId } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    const updated = await MessageService.updateMessageStatusService(
      messageId,
      userId,
      status
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: updated
        ? 'Message status updated!'
        : 'Message not found or not allowed',
      data: updated,
    });
  }
);

// @apiend: api/v1/messages/:messageId
// @method: delete
const deleteMessage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { messageId } = req.params;
    const userId = req.user.id;

    const deleted = await MessageService.deleteMessageService(
      messageId,
      userId
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: deleted
        ? 'Message deleted!'
        : 'Message not found or not allowed',
      data: deleted,
    });
  }
);

// @apiend: api/v1/messages/last/:conversationId
// @method: get
const getLastMessage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { conversationId } = req.params;
    const message = await MessageService.getLastMessageService(conversationId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: message ? 'Last message fetched!' : 'No messages found',
      data: message,
    });
  }
);

export const MessageController = {
  sendMessage,
  getMessages,
  updateMessage,
  updateMessageStatus,
  deleteMessage,
  getLastMessage,
  getOrcreateConversation,
};
