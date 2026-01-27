const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'input.txt');
const outputFilePath = path.join(__dirname, 'outputUpper.txt');

fs.readFile(inputFilePath, 'utf-8', (err, data) => {
    if (err) {
        console.log("Error in reading file:", err);
    } else {
        const upperCaseData = data.toUpperCase();
        fs.writeFile(outputFilePath, upperCaseData, (err) => {
            if (err) {
                console.log("Error in writing file:", err);
            } else {
                console.log("File has been written to output.txt");
            }
        });
    }
});