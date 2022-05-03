const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const cors = require("cors"); // viene de node

const app = express();
const server = http.createServer(app);
const io = socketio(server);
require("./socket")(io);
app.set("port", process.env.PORT || 5000);
app.use(express.static(path.join(__dirname, "public"))); // Para tener acceso a los archivos public
app.use(cors());

server.listen(app.get("port"), () => {
  console.log("Running on " + app.get("port"));
});
