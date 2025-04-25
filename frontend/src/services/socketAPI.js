import SocketService from './socketServices.js';
import { BACKEND_URL } from '@/constants.js';

class SocketAPI {
  constructor() {
    this.socketService = null;
  }

  // Initialize socket connection for a user
  connect(userId) {
    if (!this.socketService) {
      this.socketService = new SocketService(BACKEND_URL, userId);
    } else {
      console.warn("Socket connection already established.");
      // If you need to support reconnecting with a new userId, disconnect the current socket first:
      // this.disconnect();
      // this.socketService = new SocketService(BACKEND_URL, userId);
    }
  }

  // Send a private message to another user
  sendPrivateMessage(senderId, receiverId, messageContent) {
    if (this.socketService) {
      this.socketService.sendPrivateMessage(senderId, receiverId, messageContent);
    } else {
      console.error("Socket connection is not established.");
    }
  }

  // Subscribe to private messages
  onPrivateMessage(callback) {
    if (this.socketService) {
      this.socketService.subscribeToPrivateMessages(callback);
    } else {
      console.error("Socket connection is not established.");
    }
  }

  // Unsubscribe from private messages (offPrivateMessage)
  offPrivateMessage(callback) {
    if (this.socketService) {
      this.socketService.unsubscribeFromPrivateMessages(callback); // Assuming there's a method to unsubscribe
    } else {
      console.error("Socket connection is not established.");
    }
  }

  // Disconnect the socket connection
  disconnect() {
    if (this.socketService) {
      this.socketService.disconnect();
      this.socketService = null; // Clean up the socket instance after disconnecting
      console.log('Socket connection closed.');
    } else {
      console.warn('No active socket connection to disconnect.');
    }
  }
}

export default new SocketAPI(); // Export as a singleton
