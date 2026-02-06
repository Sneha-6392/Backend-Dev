import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(express.json());

const FILE = "./students.json";

// Home
app.get("/", (req, res) => {
    res.send("Welcome to Express page");
});

// Get All Students
app.get("/students", (req, res) => {

    fs.readFile(FILE, "utf-8", (err, data) => {

        if (err) {
            return res.status(500).send("Error reading file");
        }

        const students = JSON.parse(data || "[]");

        res.json(students);
    });
});

// Register Student (POST)
app.post("/students/register", (req, res) => {

    const { name, branch } = req.body;

    if (!name || !branch) {
        return res.status(400).send("Details missing");
    }

    fs.readFile(FILE, "utf-8", (err, data) => {

        if (err) {
            return res.status(500).send("Error reading file");
        }

        const students = JSON.parse(data || "[]");

        const newStudent = {
            id: students.length
                ? students[students.length - 1].id + 1
                : 1,
            name,
            branch
        };

        students.push(newStudent);

        fs.writeFile(
            FILE,
            JSON.stringify(students, null, 2),
            (err) => {

                if (err) {
                    return res.status(500).send("Error saving file");
                }

                res.status(201).json({
                    message: "Registered successfully",
                    student: newStudent
                });
            }
        );
    });
});

// Update Student (PUT with Spread)
app.put("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    fs.readFile(FILE, "utf-8", (err, data) => {

        if (err) {
            return res.status(500).send("Error reading file");
        }

        const students = JSON.parse(data || "[]");

        const index = students.findIndex(s => s.id === id);

        if (index === -1) {
            return res.status(404).send("Student not found");
        }

        // Spread Operator
        students[index] = {
            ...students[index],
            ...req.body
        };

        fs.writeFile(
            FILE,
            JSON.stringify(students, null, 2),
            (err) => {

                if (err) {
                    return res.status(500).send("Error writing file");
                }

                res.json({
                    message: "Updated successfully",
                    student: students[index]
                });
            }
        );
    });
});

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
