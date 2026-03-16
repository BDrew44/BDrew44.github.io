// fetchServer.js file
var args = process.argv.slice(2);

const http = require("http");

const port = 8686; // Port to listen on

http
  .createServer(async function (req, res) {
    var url = args[0] ? args[0] : "https://bdrew44.github.io";
    var format = args[1] ? args[1].toLowerCase() : "html";
    var contentType =
      format === "text" ||
      format === "plaintext" ||
      format === "plain" ||
      format === "text/plain"
        ? "text/plain"
        : "text/html";
    try {
      const response = await fetch(url);
      console.log(response.status, url);

      if (response.ok) {
        const body = await response.text();
        res.writeHead(200, { "Content-Type": contentType });
        res.write(body);
      } else {
        res.writeHead(response.status, { "Content-Type": contentType });
        res.write(response.statusText);
      }
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": contentType });
      res.write("fetch error: " + err.message);
    }
    res.end();
  })
  .listen(port);
