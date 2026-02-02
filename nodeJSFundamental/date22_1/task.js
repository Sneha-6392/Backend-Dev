const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'Streams', 'input.txt')
const outputFile = path.join(__dirname, 'Streams', 'output.txt')

const inputStream = fs.createReadStream(inputFile,'utf-8')

inputStream.on('data', (chunk) => {
    console.log('data is readind in chunks', chunk)
})