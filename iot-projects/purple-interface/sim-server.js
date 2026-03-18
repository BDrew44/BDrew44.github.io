// A server that simulates a device that is taking regular temperature readings.

// Load the http module to create an http server.
const http = require("http");
const WebSocket = require("ws");
const port = 8080;
//TODO 1: Variables and generateTemperature function
let temperature = 72;
let nextChange = 0;

function generateTemperature() {
  let change = Math.random() - 0.5;
  nextChange += change;
  temperature += nextChange;
  if (temperature < 0) {
    temperature = 0;
    nextChange = 0;
  }
  if (temperature > 100) {
    temperature = 100;
    nextChange = 0;
  }
}

setInterval(generateTemperature, 1000);

// Configure our HTTP server.
const server = http.createServer(function (req, res) {
  /* DO NOT EDIT THIS CODE */
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  console.log(wss);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  /* DO NOT EDIT THIS CODE */

  //TODO 2: Regular Polling Server
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ value: temperature }));
  }
});

//TODO 6: WebSocket Server
/* const wss = new WebSocket("ws://localhost:8080");

wss.on("connection", function (socket) {
  setInterval(function () {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ value: temperature }));
    }
  }, 1000);
});
*/
/* DO NOT EDIT THIS CODE */
server.listen(port);
