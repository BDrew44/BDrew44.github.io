// fetchServer.js file
const fetch = require("node-fetch");

const http = require("http");

const port = 3000; // Port to listen on

http.createServer(requestListenerFunction).listen(port);

http
  .createServer(async function (req, res) {
    const response = await fetch("http://Bdrew44.github.io");

    console.log(response);

    if (response.ok) {
      console.log("response recieved");
      console.log(response.status);
    }
    res.writeHead(200, { "Content-Type": "text/html" });
  })
  .listen(port);
