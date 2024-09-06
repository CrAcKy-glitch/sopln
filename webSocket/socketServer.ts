const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

// Your existing logic
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  console.log("a user connected");
  socket.on(
    "joinRoom",
    ({ roomId, userId }: { roomId: string; userId: string }) => {
      socket.join(roomId);
      io.to(roomId).emit("userJoined", { userId });
    }
  );

  socket.on(
    "leaveRoom",
    ({ roomId, userId }: { roomId: string; userId: string }) => {
      socket.leave(roomId);
      io.to(roomId).emit("userLeft", { userId });
    }
  );

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
