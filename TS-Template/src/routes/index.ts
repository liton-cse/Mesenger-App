import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { MessageRouter } from '../app/modules/message/message.route';

const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/chat',
    route: MessageRouter,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
