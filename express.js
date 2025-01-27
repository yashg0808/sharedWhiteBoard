// server side
const express = require("express");
// express server
const app = express();
//  nodejs
const server = require("http").Server(app);
// nodejs => socket enabled
const path = require("path");

const cors = require("cors");

const io = require("socket.io")(server);
// serve static assets to client
app.use(express.static("public"));


app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN === "*"
        ? "*" 
        : process.env.CORS_ORIGIN?.split(","),
    credentials: true,
  })
);



// server
io.on("connection", function(socket) {
  console.log(socket.id);
  socket.on("size", function(size) {
    socket.broadcast.emit("onsize", size);
  });
  socket.on("color", function(color) {
    socket.broadcast.emit("oncolor", color);
  });

  socket.on("toolchange", function(tool) {
    socket.broadcast.emit("ontoolchange", tool);
  });
  socket.on("hamburger", function() {
    socket.broadcast.emit("onhamburger");
  });
  socket.on("mousedown", function(point) {
    socket.broadcast.emit("onmousedown", point);
  });
  socket.on("mousemove", function(point) {
    console.log("Recieved Mouse down event")
    socket.broadcast.emit("onmousemove", point);
  });
  socket.on("undo", function() {
    socket.broadcast.emit("onundo");
  });
  socket.on("redo", function() {
    socket.broadcast.emit("onredo");
  });
});
// nodejs server
const port = process.env.PORT || 3000;



server.listen(port, function(req, res) {
  console.log("Server has started at port 3000");
});
