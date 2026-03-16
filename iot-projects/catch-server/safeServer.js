// TODO 1: Initialize Variables and Create Server
const http = require("http");

const port = 8686;

let serverStatus = undefined;

http
  .createServer(function (req, res) {
    // TODO 2: Request Handling, Try Block
    try {
      if (req.method === "GET") {
        res.write(serverStatus.status);
        res.writeHead(200, { "Content-Type": "text/plain" });
      } else if (req.method === "PUT") {
        // TODO 5: Request Handling, PUT Request
        let body = "";

        req.on("data", function (data) {
          body += data;
        });

        req.on("end", function () {
          serverStatus = {};
          serverStatus.status = JSON.parse(body).status;
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.write("The server has been updated.");
        });
      }
    } catch (error) {
      // TODO 3: Request Handling, Catch Block
      res.write("The server has no data.");
    } finally {
      // TODO 4: Request Handling, Finally Block
      res.write("-and the message arrived");
      res.end();
    }
  })
  .listen(port);
