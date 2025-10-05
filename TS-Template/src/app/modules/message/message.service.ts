import { IMessage, MESSAGE_STATUS } from './message.interface';
import { IConversation } from '../conversation/conversation.interface';
import { MessageModel } from './message.model';
import { ConversationModel } from '../conversation/conversation.model';

const getOrcreateConversation = async (data: Partial<IMessage>) => {
  const { senderId, receiverId } = data;

  if (!senderId || !receiverId) {
    throw new Error(
      'Both senderId and receiverId are required to create a conversation'
    );
  }

  let conversation = await ConversationModel.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await ConversationModel.create({
      participants: [senderId, receiverId],
      createdAt: new Date(),
    });
  }

  return conversation;
};

// Send a message (create new conversation if needed)
const sendMessageService = async (data: Partial<IMessage>) => {
  // Create the message
  const message = await MessageModel.create(data);

  // Update conversation's lastMessage
  if (message.conversationId) {
    await ConversationModel.findByIdAndUpdate(message.conversationId, {
      lastMessage: message.content || 'Media',
    });
  }
  return message;
};

// Get all messages in a conversation
const getMessagesService = async (conversationId: string) => {
  return await MessageModel.find({ conversationId }).sort({ createdAt: 1 });
};

// Update message content
const updateMessageService = async (
  messageId: string,
  userId: string,
  content: string
) => {
  const message = await MessageModel.findOne({
    _id: messageId,
    senderId: userId,
  });
  if (!message) return null;

  message.content = content;
  await message.save();
  return message;
};

// Update message status (DELIVERED / READ)
const updateMessageStatusService = async (
  messageId: string,
  userId: string,
  status: MESSAGE_STATUS
) => {
  const message = await MessageModel.findOne({
    _id: messageId,
    receiverId: userId,
  });
  if (!message) return null;

  message.status = status;
  await message.save();
  return message;
};

// Delete a message (only sender)
const deleteMessageService = async (messageId: string, userId: string) => {
  const message = await MessageModel.findOneAndDelete({
    _id: messageId,
    senderId: userId,
  });
  return message;
};

// Get last message of a conversation
const getLastMessageService = async (conversationId: string) => {
  return await MessageModel.findOne({ conversationId }).sort({ createdAt: -1 });
};
export const MessageService = {
  sendMessageService,
  getMessagesService,
  updateMessageService,
  updateMessageStatusService,
  deleteMessageService,
  getLastMessageService,
  getOrcreateConversation,
};
