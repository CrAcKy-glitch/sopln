const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rooms: { [key: string]: string[] } = {};

io.on("connection", (socket: any) => {
  console.log("A user connected");

  socket.on("signal", (data: { roomId: string; signalData: any }) => {
    const { roomId, signalData } = data;
    socket.to(roomId).emit("signal", signalData);
  });

  socket.on("join-room", (roomId: string, userName: string) => {
    socket.join(roomId);

    if (!rooms[roomId]) rooms[roomId] = [];
    rooms[roomId].push(userName);

    io.to(roomId).emit("participants-update", rooms[roomId]);
    console.log(`${userName} joined ${roomId}`);
  });

  socket.on("leave-room", (roomId: string, userName: string) => {
    socket.leave(roomId);

    if (rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter((name) => name !== userName);
      io.to(roomId).emit("participants-update", rooms[roomId]);
      console.log(`${userName} left ${roomId}`);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("voice-data", (roomId: string, voiceData: Blob) => {
    socket.broadcast.to(roomId).emit("receive-voice", voiceData);
  });
});

server.listen(3001, () => {
  console.log("Listening on *:3001");
});
