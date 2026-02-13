import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const FILE = path.join(__dirname, "data", "students.json");

const readStudents = () => {
    const data = fs.readFileSync(FILE);
    return JSON.parse(data);
};

const writeStudents = (students) => {
    fs.writeFileSync(FILE, JSON.stringify(students, null, 2));
};

app.get("/", (req, res) => {
    res.render("form");
});

app.post("/students/add", (req, res) => {
    const students = readStudents();

    const newStudent = {
        id: Date.now().toString(),
        name: req.body.name,
        branch: req.body.branch
    };

    students.push(newStudent);
    writeStudents(students);

    res.redirect("/students");
});

app.get("/students", (req, res) => {
    let students = readStudents();

    const branch = req.query.branch;

    if (branch) {
        students = students.filter(s => s.branch === branch);
    }

    res.render("students", {
        students,
        total: students.length,
        selectedBranch: branch || ""
    });
});

app.get("/students/delete/:id", (req, res) => {
    let students = readStudents();

    students = students.filter(s => s.id !== req.params.id);

    writeStudents(students);

    res.redirect("/students");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
