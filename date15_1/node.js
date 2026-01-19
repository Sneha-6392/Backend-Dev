const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const { name, email } = parsedUrl.query;

  switch (pathname) {

    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Welcome to Home Page</h1>");
      break;

    case "/about":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        `<h1>About Us</h1>
         <p>Hello I am ${name || "Guest"}</p>
         <p>Email: ${email || "Not provided"}</p>`
      );
      break;

    case "/contact":
      const user = {
        id: 1,
        name: "Sneha",
        contact: "6392147566"
      };

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        `<h1>Contact Us</h1>
         <p>Contact: ${user.contact}</p>`
      );
      break;

    case "/alllogs":
      fs.readFile("./activity.log", "utf-8", (err, data) => {
        if (err) {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("No logs found");
        } else {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end(data);
        }
      });
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Page Not Found</h1>");
  }
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});