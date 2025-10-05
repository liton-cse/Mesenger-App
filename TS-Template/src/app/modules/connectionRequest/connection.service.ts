import { ConnectionModel } from './connection.model';
import { IConnectionRequest, CONNECTION_STATUS } from './connection.interface';

// Create a new connection request
const createConnection = async (senderId: string, receiverId: string) => {
  const connection = await ConnectionModel.create({ senderId, receiverId });
  return connection;
};

// Get all connection requests for a user
const getUserConnections = async (userId: string) => {
  const connections = await ConnectionModel.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
  }).populate('senderId receiverId', 'name email'); // Populate sender and receiver basic info
  return connections;
};

// Update connection status (accept/reject)
const updateConnectionStatus = async (
  connectionId: string,
  status: CONNECTION_STATUS
) => {
  const connection = await ConnectionModel.findByIdAndUpdate(
    connectionId,
    { status },
    { new: true }
  );
  return connection;
};

// Delete a connection request
const deleteConnection = async (connectionId: string) => {
  const deletedConnection = await ConnectionModel.findByIdAndDelete(
    connectionId
  );
  return deletedConnection;
};

export const connectionService = {
  createConnection,
  getUserConnections,
  updateConnectionStatus,
  deleteConnection,
};
