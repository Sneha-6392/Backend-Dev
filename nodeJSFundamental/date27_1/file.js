const fs = require("fs");
const path = require("path");

const inputFilePath = path.join(__dirname, "input.txt");
const outputFilePath = path.join(__dirname, "output.txt");

// Normal async read (fs.readFile)
// Puri file ek baar me memory me load hoti hai
// Small files ke liye best hota hai
// Large files me RAM zyada use hoti hai
// Jab tak poori file read nahi hoti, tab tak process start nahi hota
// Example: Jaise pehle poori book uthao, phir padhna shuru karo

fs.readFile(inputFilePath, "utf-8", (err, data) => {
    if (err) {
        console.log("Error in reading file:", err);
    } else {
        console.log("File data:");
        console.log(data);
    }
});

// Stream read (createReadStream)
// File chhote-chhote chunks me read hoti hai
// Memory efficient hota hai
// Large files ke liye best approach
// Jaise hi chunk aata hai, turant process ho jata hai
// Example: Jaise book ke page-by-page padhte jao

const inputStream = fs.createReadStream(inputFilePath, "utf-8");

inputStream.on("data", (chunk) => {
    console.log("Reading data in chunks:");
    console.log(chunk);
});

inputStream.on("error", (err) => {
    console.log("Error while reading file using stream:", err);
});

// Pipe example (optional)
const writeStream = fs.createWriteStream(outputFilePath);
inputStream.pipe(writeStream);

writeStream.on("finish", () => {
    console.log("Data has been written to output.txt using pipe.");
});