const fs = require("fs");
const path = require("path");
const { Transform } = require("stream"); // <- add this

const inputFilePath = path.join(__dirname, "input.txt");
const transformOutputFilePath = path.join(__dirname, "transformed_output.txt");

const readStream = fs.createReadStream(inputFilePath, { encoding: "utf8" });
const writeStream = fs.createWriteStream(transformOutputFilePath);

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    try {
      const upperCaseChunk = chunk.toString().toUpperCase();
      callback(null, upperCaseChunk); 
    } catch (err) {
      callback(err);
    }
  }
});

// Pipe streams and handle errors
readStream
  .on("error", (err) => console.error("Read error:", err))
  .pipe(upperCaseTransform)
  .on("error", (err) => console.error("Transform error:", err))
  .pipe(writeStream)
  .on("error", (err) => console.error("Write error:", err))
  .on("finish", () => console.log("Transformation complete."));