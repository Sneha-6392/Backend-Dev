// const {areaofcircle} = require("./math");
// console.log(areaofcircle(5));

// require("./math") math.js ke exported functions ko import karta hai
// aur object destructuring se add aur remove ko directly variables me store kiya jata hai.

// Destructuring ka matlab hota hai
//object ya array se values ko direct variables me nikaal lena

/*
1- WITHOUT destructuring (pehle ka tareeka)
const math = require("./math");

const add = math.add;
const remove = math.remove;

2️- WITH destructuring (short & clean)
const { add, remove } = require("./math");

*/

// Node.js ka built-in File System module import kiya
// fs module file create, read, write, delete karne ke kaam aata hai

const fs = require("fs");


// writeFileSync ka matlab: file ko SYNCHRONOUS tarike se write karna
// "./text.txt" → current folder me text.txt naam ki file banayega
// "This is Sync file content" → file ke andar likha jane wala data
// Agar file pehle se exist karti hai → uska data overwrite ho jayega
// Jab tak file write complete nahi hoti, program aage nahi badhega

fs.writeFileSync("./text.txt", "This is Sync file content");

// const file = fs.readFileSync("./text.txt", "utf-8"); // file ko read karna
// "utf-8" → encoding format, jisse text ko sahi tarike se read kiya ja sake

// readFileSync ka matlab: file ko SYNCHRONOUS tarike se read karna
// Jab tak file read complete nahi hoti, program aage nahi badhega
// console.log(file); // file ka content console me print karna

const asyncfile = fs.readFile("./text.txt", "utf-8", (err, data) => {
    // Callback function jo file read hone ke baad chalega
    // err → agar file read karte waqt koi error aata hai to wo yahan milega
    // data → file ka content yahan milega agar read successful hota hai
    if (err) {
        console.log("Error reading file:", err);
    }
    else {       
        console.log("File content:", data);
    }
});
// readFile ka matlab: file ko ASYNCHRONOUS tarike se read karna
// Program file read karte waqt aage badh sakta hai
// Jab file read complete hoti hai, tab callback function call hota hai