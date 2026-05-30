import dotenv from "dotenv";
import http from "http";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { initSocket } from "./src/socket/socket.js";

dotenv.config();

connectDB();

const server = http.createServer(app);

// initialize socket
initSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});