var app = require("express")();
var express = require("express");
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});

// Socket IO config

io.on("connection", (socket) => {
  console.log("Connection established");
  socket.on("htmlmsg", (msg) => {
    socket.broadcast.emit("htmlmsg", msg);
  });
  socket.on("cssmsg", (msg) => {
    socket.broadcast.emit("cssmsg", msg);
  });
  socket.on("jsmsg", (msg) => {
    socket.broadcast.emit("jsmsg", msg);
  });
  io.on("disconnect", (msg) => {
    console.log("user " + socket.id + "left");
  });
});
