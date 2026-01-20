const fs = require("fs");

// to copy file
fs.copyFile("text.txt", "textAsyncCopy.txt", (err) => {
  if (err) {
    console.error("Error while file is copied", err);
  }
  else {
    console.log("File is copied successfully");
  }
})

// is line ko upar likhenge toh crash kr jayega
fs.copyFileSync("text.txt", "textSyncCopy.txt")
console.log("File is copied successfully using sync method");

// to unlink
// fs.unlink("textAsyncCopy.txt", (err) => {
//   if (err) {
//     console.error("Error while file is deleted", err);
//   }
//   else {
//     console.log("File is deleted successfully");
//   }
// })

// fs.unlinkSync("textSyncCopy.txt");
// console.log("File is deleted successfully using sync method");