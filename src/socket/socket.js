import { Server } from "socket.io";

let io;
const onlineUsers = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // register user
    socket.on("register", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    // disconnect cleanup
    socket.on("disconnect", () => {
      for (let [userId, socketId] of onlineUsers) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });

  return io;
};

// helper getters
export const getIO = () => io;
export const getOnlineUsers = () => onlineUsers;