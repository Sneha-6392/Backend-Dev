const http = require("http");
const server = http.createServer((req, res) => {
    switch (req.url) {
        case "/":
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("<h1>Welcome to the Home Page</h1>");
            break;
        case "/about":
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("<h1>This is the About Page</h1>");
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
    }
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});

