const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
require("./socket")(io);
app.set("port", 3000);
app.use(express.static(path.join(__dirname, "public"))); // Para tener acceso a los archivos public

server.listen(app.get("port"), () => {
  console.log("Running on " + app.get("port"));
});
