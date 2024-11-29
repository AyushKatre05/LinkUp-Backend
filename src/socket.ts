import { Server, Socket } from "socket.io";

interface CustomSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    if (!room) {
      return next(new Error("Invalid room"));
    }
    socket.room = room;
    next();
  });
  io.on("connection", (socket: CustomSocket) => {
    socket.join(socket.room);
    socket.on("message", (data) => {
      try {
        socket.to(socket.room).emit("message", data);
      } catch (error) {
        console.log("Error handling message:", error);
      }
    });
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}
