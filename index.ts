import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {pingInterval: 1000});

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.get("/test", (req, res) => res.send());

io.on("connection", (socket) => {
  socket.on("time", (time: number, cb) => {
    const diff = Date.now() - time;
    console.log("Ping", diff);
    cb(diff);
  })
});

server.listen(3005, () => {
  console.log('listening on *:3005');
});