const express = require ("express");
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require ("cors");

app.use(cors());

const server = http.createServer(app)

const io= new Server(server, {
    //THIS MAKES A MIDDLEWARE CONNECTION TO REACT-APP-CLIENT
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket)=>{
    console.log(`User Connected: ${socket.id}` )

    socket.on("join_room", (data)=>{
        socket.join(data);
    });
// USED TO CONSOLE MSG ON TERMINAL
    socket.on("send_message", (data)=>{
        console.log(data);
    });
//THIS WILL WORKED AS RECEIVED MESSAGE THAT HAS MESSAGE & SENDS TO ALL CONNECTED USER
    // socket.on("send_message", (data)=>[
    //     socket.broadcast.emit("received_message", data)
    // ]);

//THIS HAS ROOM WHICH ONLY SENDS MESSAGE TO ONLY SELECTED USER WHICH IS CONNECTED TO PARTICULAR ROOM
    socket.on("send_message", (data)=>{
        socket.to(data.room).emit("received_message", data);
    })    
})

server.listen(3001, ()=>{
    console.log("Server is running on port :3001 ");
})