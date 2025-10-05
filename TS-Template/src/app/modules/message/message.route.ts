import { Router } from 'express';
import { MessageController } from './message.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = Router();
router.post(
  '/conversation',
  auth(USER_ROLES.USER),
  MessageController.getOrcreateConversation
);

router.post('/', auth(USER_ROLES.USER), MessageController.sendMessage);
router.get(
  '/:conversationId',
  auth(USER_ROLES.USER),
  MessageController.getMessages
);
router.get(
  '/last/:conversationId',
  auth(USER_ROLES.USER),
  MessageController.getLastMessage
);
router.patch(
  '/update/:messageId',
  auth(USER_ROLES.USER),
  MessageController.updateMessage
);
router.patch(
  '/status/:messageId',
  auth(USER_ROLES.USER),
  MessageController.updateMessageStatus
);
router.delete(
  '/:messageId',
  auth(USER_ROLES.USER),
  MessageController.deleteMessage
);

export const MessageRouter = router;
