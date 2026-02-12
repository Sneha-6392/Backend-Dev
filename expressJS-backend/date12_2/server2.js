import express from 'express';
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

const students = [
    { id: 1,name: 'Sneha', branch: 'CSE' },
    { id: 2,name: 'Vanshika', branch: 'CIVIL' },
    { id: 3,name: 'Astha', branch: 'MECHANICAL' } 
];

app.get('/', (req, res) => {
    res.render("form", {allStudents: students});
});

app.post('/submit', (req, res) => {
    console.log("form", req.body);
    res.send("registered");
}); 

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

