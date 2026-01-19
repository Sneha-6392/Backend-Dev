const os = require("os");
const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "task3-system-info.log");

function logSystemInfo() {
  const timestamp = new Date().toLocaleString();

  const systemInfo = `
[${timestamp}]
Platform: ${os.platform()}
CPU Architecture: ${os.arch()}
CPU Cores: ${os.cpus().length}
Total Memory: ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB
Free Memory: ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB
----------------------------------------
`;

  fs.appendFile(logFile, systemInfo, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    }
  });
}

setInterval(logSystemInfo, 5000);

console.log("System information logger started...");
