const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5175",
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`);

    socket.on("send-message", (message) => {
        console.log(message);
        io.emit("received-message", message);
    });

    socket.on("delete-message", (messageId) => {
        io.emit("message-deleted", messageId);
    });

    socket.on("disconnected", () => console.log("User disconnected"));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
