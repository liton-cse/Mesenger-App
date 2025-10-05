import { Router } from 'express';
import { ConnectionController } from './connection.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = Router();

router.post(
  '/',
  auth(USER_ROLES.USER),
  ConnectionController.sendConnectionRequest
); // send request
router.get(
  '/:userId',
  auth(USER_ROLES.USER),
  ConnectionController.getConnections
); // get connections for a user
router.patch(
  '/:id',
  auth(USER_ROLES.USER),
  ConnectionController.updateConnection
); // update status
router.delete(
  '/:id',
  auth(USER_ROLES.USER),
  ConnectionController.removeConnection
); // delete connection

export default router;
