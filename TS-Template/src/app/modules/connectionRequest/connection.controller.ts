import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { connectionService } from './connection.service';
import { CONNECTION_STATUS } from './connection.interface';

// @apiend: api/v1/connections
// @method: post
const sendConnectionRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { receiverId } = req.body;
      const senderId = req.user.id; // assuming JWT middleware sets req.user
      const connection = await connectionService.createConnection(
        senderId,
        receiverId
      );

      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Connection request sent successfully!',
        data: connection,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @apiend: api/v1/connections/:userId
// @method: get
const getConnections = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const connections = await connectionService.getUserConnections(userId);

      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Connections fetched successfully!',
        data: connections,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @apiend: api/v1/connections/:id
// @method: patch
const updateConnection = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const connectionId = req.params.id;
      const { status } = req.body;
      const updatedConnection = await connectionService.updateConnectionStatus(
        connectionId,
        status as CONNECTION_STATUS
      );

      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Connection status updated successfully!',
        data: updatedConnection,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @apiend: api/v1/connections/:id
// @method: delete
const removeConnection = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const connectionId = req.params.id;
      const deletedConnection = await connectionService.deleteConnection(
        connectionId
      );

      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Connection deleted successfully!',
        data: deletedConnection,
      });
    } catch (error) {
      next(error);
    }
  }
);

export const ConnectionController = {
  sendConnectionRequest,
  getConnections,
  updateConnection,
  removeConnection,
};
