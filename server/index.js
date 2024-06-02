const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors : {
        origin : "http://localhost:5173",
        methods : ["GET","POST"]
    },
});

io.on("connection",(socket)=>{
    console.log(`User Connected : ${socket.id}`);

    socket.on("send-message",(message)=>{
        console.log(message)
        //BroadCast the received message to all the connected users
        io.emit("received-message",message)
    })

    socket.on("disconnected",()=>console.log("User disconnected"))
});

server.listen(5000,()=> console.log("server is running on port 5000"));