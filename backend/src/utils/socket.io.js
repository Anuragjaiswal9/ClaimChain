import { Server } from "socket.io";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // Retrieve userId from the query when the user connects
    const userId = socket.handshake.query.userId;

    if (userId) {
      // User joins their own room based on userId
      socket.join(userId);
      console.log(
        `User ${userId} connected with Socket ID: ${socket.id} and joined room: ${userId}`
      );
    }

    socket.on("privateMessage", (data) => {
      const { to, from, message } = data;

      // Determine if the message was sent by the current user
      const isSent = to === from;

      const messages = {
        message: message.message,
        timestamp: message.timestamp,
        isSent,
      };

      io.to(to).emit("privateMessage", { messages });
      console.log(`Message from ${from} to ${to}: ${messages.message}`);
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      console.log(`User ${userId} disconnected`);
    });
  });

  return io;
};
