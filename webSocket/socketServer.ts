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

  socket.on("join-room", (roomName: string, userName: string) => {
    socket.join(roomName);

    if (!rooms[roomName]) rooms[roomName] = [];
    rooms[roomName].push(userName);

    io.to(roomName).emit("participants-update", rooms[roomName]);
    console.log(`${userName} joined ${roomName}`);
  });

  socket.on("leave-room", (roomName: string, userName: string) => {
    socket.leave(roomName);

    if (rooms[roomName]) {
      rooms[roomName] = rooms[roomName].filter((name) => name !== userName);
      io.to(roomName).emit("participants-update", rooms[roomName]);
      console.log(`${userName} left ${roomName}`);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("voice-data", (roomName: string, voiceData: Blob) => {
    socket.broadcast.to(roomName).emit("receive-voice", voiceData);
  });
});

server.listen(3001, () => {
  console.log("Listening on *:3001");
});
