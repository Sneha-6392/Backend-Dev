const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req, res);
    const pathname = parsedUrl.pathname;
    const {name, key} = parsedUrl.query;

    if(pathname === "/"){
        if(name === 'admin' && key === 'secret') {
            res.writeHead(200, {"content-type": "text/plain"});
            res.end("Welcom to the Vault");          
        }
        else {
            res.writeHead(401, {"content-type": "text/plain"});
            res.end("Access denied");
        }
    }
    else {
        res.writeHead(404, {"content-type": "text/plain"});
        res.end("Page not found");
    }
});

server.listen(8000, () => {
    console.log("Server is running on port 8000");
});