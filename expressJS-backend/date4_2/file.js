import express from "express";
import fs from "fs/promises";

const app = express();
const PORT = 3000;

app.use(express.json());

const FILE = "students.json";

// Read students from file
const readStudents = async () => {
    const data = await fs.readFile(FILE, "utf8");
    return JSON.parse(data);
};

// Write students to file
const writeStudents = async (data) => {
    await fs.writeFile(FILE, JSON.stringify(data, null, 2));
};

// Home
app.get("/", (req, res) => {
    res.send("Welcome to Express page");
});

// Get all students / filter by branch
app.get("/students", async (req, res) => {

    const branch = req.query.branch;

    const students = await readStudents();

    if (branch) {
        const filtered = students.filter(
            s => s.branch === branch
        );
        return res.json(filtered);
    }

    res.json(students);
});

// Get student by ID
app.get("/students/:id", async (req, res) => {

    const id = Number(req.params.id);

    const students = await readStudents();

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

// Register student (POST)
app.post("/students/register", async (req, res) => {

    const { id, name, branch } = req.body;

    if (!id || !name || !branch) {
        return res.status(400).json({
            message: "All fields required"
        });
    }

    const students = await readStudents();

    const exists = students.find(s => s.id === id);

    if (exists) {
        return res.status(409).json({
            message: "ID already exists"
        });
    }

    const newStudent = { id, name, branch };

    students.push(newStudent);

    await writeStudents(students);

    res.status(201).json({
        message: "Student saved",
        student: newStudent
    });
});

// Update student (PUT)
app.put("/students/update/:id", async (req, res) => {

    const id = Number(req.params.id);
    const { name, branch } = req.body;

    const students = await readStudents();

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    if (name) student.name = name;
    if (branch) student.branch = branch;

    await writeStudents(students);

    res.json({
        message: "Updated successfully",
        student
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
