const http = require("http");
const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "access.log");

const server = http.createServer((req, res) => {
const timestamp = new Date().toISOString();
const method = req.method;
const url = req.url;

const logMessage = `[${timestamp}] | Method: ${method} | URL: ${url}\n`;

fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
        console.error("File write error:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error logging request");
        return;
    }

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Request Logged Successfully!");
    });
});

server.listen(5000, () => {
    console.log("Server is listening on port 5000");
});
