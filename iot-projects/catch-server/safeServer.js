const http = require("http");

const port = 3000;

const server = http
  .createServer(function (req, res) {
    try {
      if (req.method === "GET") {
        res.write(serverStatus.status);
        res.writeHead(200, { "Content-Type": "text/plain" });
      } else if (req.method === "PUT") {
        var body = "";
        req.on("data", function (data) {
          body += data;
        });
        req.on("end", function () {
          serverStatus = {};
          serverStatus.status = JSON.parse(body);
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.write("The server has been updated.");
        });
      }
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.write("The server has no data.");
    } finally {
      if (serverStatus && serverStatus.status) {
        res.write(serverStatus.status + "-and the message arrived");
      }
      res.end();
    }
  })
  .listen(port);

let serverStatus = undefined;
