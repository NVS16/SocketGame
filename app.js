var express = require("express");
var app = express();
var http = require("http").Server(app);
var bodyParser = require("body-parser");
var io = require("socket.io")(http);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

var gameController = {
  Winterfell: {
    "connected-clients": 0,
    members: [
      /* {"name" : "" ,
             "id" : "" ,
             "key" : "}*/
    ],
    score: 0,
    answersCorrect: []
  },
  Vale: {
    "connected-clients": 0,
    members: [
      /*{ /*"name" : "" ,
               "//id" : "" ,
               "key" : "} */
    ],
    score: 0,
    answersCorrect: []
  }
};

io.on("connection", function(socket) {
  console.log("a user connected : " + socket.id);

  // room socket
  socket.on("joinroom", function(data) {
    console.log(data);

    if (gameController[data.roomname]["connected-clients"] < 2) {
      socket.join(data.roomname);
      socket.roomName = data.roomname;
      socket.memberDetails = {
        name: data.name,
        id: socket.id
      };
      gameController[data.roomname]["connected-clients"] += 1;
      gameController[data.roomname]["members"].push(socket.memberDetails);
      console.log(gameController);
      socket.emit("entered");
    } else {
      console.log("works");
      socket.emit("room-full", data.roomname);
      console.log(socket.id);
      // io.emit('room-full', room);
      // socket.to(socket.id).emit('message', 'Room is full');
      // socket.broadcast.to(socket.id).emit('message', 'room is full');
    }
  });
  // draw socket
  socket.on("engage", function(e) {
    console.log("Point received", socket.roomName, socket.id);
    socket.in(socket.roomName).emit("engage", e);
  });
  socket.on("draw", function(e) {
    console.log("Drawing", socket.roomName, socket.id);
    socket.in(socket.roomName).emit("draw", e);
  });
  socket.on("disengage", function() {
    console.log("Disengaged", socket.roomName, socket.id);
    socket.in(socket.roomName).emit("disengage");
  });
  socket.on("draw-first", function(msg) {
    console.log(msg);
    socket.broadcast
      .to(socket.roomName)
      .emit("see-drawing", "Your partner will draw first");
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
    if (socket.roomName) {
      gameController[socket.roomName]["connected-clients"]--;
      // gameController[socket.roomName
    }
    io.emit("room-vacant", socket.roomName);
  });
});

app.use(express.static(__dirname + "/public"));

http.listen(3000, function() {
  console.log("listening on : 3000");
});
