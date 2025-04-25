import { io } from 'socket.io-client';

class SocketService {
  constructor(baseUrl, userId) {
    if (!this.socket) {  // Ensure single socket instance
      this.socket = io(baseUrl, {
        query: { userId: userId }, // Pass userId as a query parameter
      });

      // Automatically join the user's room upon connection
      this.socket.on('connect', () => {
        if (userId) {
          this.socket.emit('join', userId); // Join the room using userId
          console.log(`User ${userId} connected with Socket ID: ${this.socket.id}`);
        }
      });
    }
  }

  // Send a private message to a specific user
  sendPrivateMessage(sender, receiver, content) {
    if (this.socket) {
      this.socket.emit('privateMessage', { from: sender, to: receiver, message: content });
    } else {
      console.error("Socket connection is not established.");
    }
  }

  // Subscribe to receive private messages
  subscribeToPrivateMessages(callback) {
    if (this.socket) {
      this.socket.on('privateMessage', (message) => {
        callback(message); // Pass the received message to the callback function
      });
    } else {
      console.error("Socket connection is not established.");
    }
  }

  // Unsubscribe from receiving private messages
  unsubscribeFromPrivateMessages(callback) {
    if (this.socket) {
      this.socket.off('privateMessage', callback); // Remove the specific listener for 'privateMessage'
    } else {
      console.error("Socket connection is not established.");
    }
  }

  // Disconnect the socket manually
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log(`User disconnected with Socket ID: ${this.socket.id}`);
      this.socket = null;  // Clean up socket instance on disconnect
    } else {
      console.error("No active socket to disconnect.");
    }
  }
}

export default SocketService;
