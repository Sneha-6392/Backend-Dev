import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const PORT = 3000;

const FILE = "./data.json";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/form.html');
});

app.post('/submit', (req, res) => {

    const newData = req.body;

    fs.readFile(FILE, 'utf-8', (err, data) => {

        let jsonData = [];

        if (!err && data) {
            jsonData = JSON.parse(data);
        }

        jsonData.push(newData);

        fs.writeFile(FILE, JSON.stringify(jsonData, null, 2), (err) => {

            if (err) {
                return res.send("Error writing to file");
            }

            console.log("Form Data Received:");
            console.log(newData);

            res.send("Form submitted successfully");
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port https://localhost:${PORT}`);
});