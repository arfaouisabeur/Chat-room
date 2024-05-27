const express = require('express');
const path = require('path');
const http = require('http'); // Import http module

const app = express();
const server = http.createServer(app); // Create an http server using your express app

app.use(express.static(path.join(__dirname, "/public")));

const io = require("socket.io")(server);

io.on('connection', function (socket) {
    socket.on("newuser", function (username) {
        io.emit("update", username + " has joined"); // Emit the "update" event to all connected clients
    });

    socket.on("exituser", function (username)  {
        io.emit("update", username + " has left"); // Emit the "update" event to all connected clients
    });

    socket.on("chat", function (message) { // You should listen for the "chat" event and use the message parameter
        io.emit("chat", message); // Emit the "chat" event to all connected clients
    });
});

const port =  5000;

server.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
