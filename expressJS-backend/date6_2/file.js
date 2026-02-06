import express from "express";
import fs from "fs/promises";

const app = express();
const PORT = 3000;

app.use(express.json());

const FILE = "./students.json";

// Home
app.get("/", (req, res) => {
    res.send("Welcome to Express page");
});


// Read function banaya hai to resuse in code
const readStudentFromFile = async () => {
    try {
        const data = await fs.readFile(FILE, "utf-8");
        return JSON.parse(data || "[]");
    } catch (err) {
        return [];
    }
};


// Write function banaya hai to resuse in code
const writeStudentsToFile = async (students) => {
    try {
        await fs.writeFile(FILE, JSON.stringify(students, null, 2));
    } catch (err) {
        console.error("Error writing file:", err);
    }
};


// Get all students
app.get("/students", async (req, res) => {
    try {
        const students = await readStudentFromFile();
        res.json(students);
    } catch (err) {
        res.status(500).send("Error reading file");
    }
});


// To register new student
app.post("/students/register", async (req, res) => {

    try {
        const { name, branch } = req.body;

        if (!name || !branch) {
            return res.status(400).send("Details missing");
        }

        // Reused read function
        const existingStudents = await readStudentFromFile();

        const newStudent = {
            id: existingStudents.length ? existingStudents[existingStudents.length - 1].id + 1 : 1,
            name,
            branch
        };

        // Reused write function
        existingStudents.push(newStudent);

        await writeStudentsToFile(existingStudents);

        res.status(201).json({
            message: "Registered successfully",
            student: newStudent
        });

    } catch (err) {
        res.status(500).send("Server error");
    }
});


// Update Student
app.put("/students/:id", async (req, res) => {

    try {
        const id = Number(req.params.id);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send("Empty body not allowed");
        }

        // Reused read function
        const existingStudents = await readStudentFromFile();

        const index = existingStudents.findIndex(
            s => s.id === id
        );

        if (index === -1) {
            return res.status(404).send("Student not found");
        }

        // Spread operator update
        existingStudents[index] = {
            ...existingStudents[index],
            ...req.body
        };

        // Reused write function
        await writeStudentsToFile(existingStudents);

        res.json({
            message: "Updated successfully",
            student: existingStudents[index]
        });

    } catch (err) {
        res.status(500).send("Server error");
    }
});

app.delete("/students/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // Reused read function
        const existingStudents = await readStudentFromFile();

        const index = existingStudents.findIndex(s => s.id === id); 

        if(index === -1) {
            return res.status(404).send("Student not found");
        }

        existingStudents.splice(index, 1);

        // Reused write function
        await writeStudentsToFile(existingStudents);
        res.json({
            message: "Deleted successfully"
        });
    } catch (err) {
        res.status(500).send("Server error");
    }
});

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
