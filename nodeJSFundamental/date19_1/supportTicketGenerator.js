const fs = require("fs");
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const { name, issue, priority } = parsedUrl.query;

  if (pathname === "/complain") {

    const ticketId = "TKT-" + Math.floor(Math.random() * 100000);

    const log = `
    Ticket ID: ${ticketId}
    Name: ${name}
    Issue: ${issue}
    Priority: ${priority}
    ------------------
    `;

    const fileName = priority === "high"
      ? "URGENT.txt"
      : "normal_complaints.txt";

    fs.appendFile(fileName, log, (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to save complaint" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          ticketId,
          message: "We will solve your issue soon"
        }));
      }
    });

  } else {

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});