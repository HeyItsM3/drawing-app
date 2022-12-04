const socket = io("https://drawing-app-six.vercel.app", {
  transports: ["websocket", "polling"],
});
let click = false; // Comprobar cuando se hace click en la pantalla
let moving_mouse = false; //Comprobar movimiento del mouse
//Posiciones en x e y
let x_position = 0;
let y_position = 0;
let previous_position = null;
let color = "black";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

canvas.addEventListener("mousedown", () => {
  click = true;
});

canvas.addEventListener("mouseup", () => {
  click = false;
});

canvas.addEventListener("mousemove", (e) => {
  x_position = e.clientX;
  y_position = e.clientY;
  moving_mouse = true;
});

function change_color(c) {
  color = c;
  context.strokeStyle = color;
  context.stroke();
}

function delete_all() {
  socket.emit("delete");
}

function create_drawing() {
  if (click && moving_mouse && previous_position != null) {
    let drawing = {
      x_position: x_position,
      y_position: y_position,
      color: color,
      previous_position: previous_position,
    };
    socket.emit("drawing", drawing);
  }
  previous_position = { x_position: x_position, y_position: y_position }; //Si no se dibujo, se crea una posición previa (posicion inicial)
  setTimeout(create_drawing, 25);
}

socket.on("show_drawing", (drawing) => {
  if (drawing != null) {
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = drawing.color;
    context.moveTo(drawing.x_position, drawing.y_position);
    context.lineTo(
      drawing.previous_position.x_position,
      drawing.previous_position.y_position
    );
    context.stroke();
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
});

socket.on("users", (number) => {
  users.innerHTML = `Número de usuario conectados: ${number}`;
});

create_drawing();
