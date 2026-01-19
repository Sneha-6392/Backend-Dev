const fs = require("fs");
fs.readFile("task1.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("error in reading");
    return;
  }
  const w = data.trim().split(/\s+/);
  const finalcount = w.length;

  fs.writeFile(
    "output1.txt",
    `the number of words in the file task1.txt is ${finalcount}`,
    (err) => {
      if (err) {
        console.log("error in writing output in file");
        return;
      }

      console.log("file written successfully");
    },
  );
});
