import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

const students = [
    { id: 1, name: "john", branch: "CSE" },
    { id: 2, name: "jane", branch: "ECE" },
    { id: 3, name: "doe", branch: "MECH" },
];

// home page open hoga
app.get("/", (req, res) => {
    res.send("Welcome to Express page");
});

// all students ka data milega + agar branch doge toh uske according bhi milega
app.get("/students", (req, res) => {
    const branch = req.query.branch;

    if (branch) {
        const filtered = students.filter(
            (student) => student.branch === branch
        );

        return res.json(filtered);
    }

    res.json(students);
});

// kisi ek student ka data milega id ke through
app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(
        (student) => student.id === id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

// new student ko register karne ke liye
app.post("/students/register", (req, res) => {
    const { id, name, branch } = req.body;

    console.log("<<<", req.body);

    // check karega if all field are given
    if (!id || !name || !branch) {
        return res.status(400).json({
            message: "All fields (id, name, branch) are required"
        });
    }

    // check karega if student with same id already exists
    const exists = students.find(
        (student) => student.id === id
    );

    // if exists, toh error dega
    if (exists) {
        return res.status(409).json({
            message: "Student with this ID already exists"
        });
    }

    // new student ko add karega
    const newStudent = {
        id,
        name,
        branch
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student registered successfully",
        student: newStudent
    });
});

// existing student ka branch update karne ke liye
app.put("/students/update/:id", (req, res) => {
    const id = Number(req.params.id);
    const { branch } = req.body;

    // Check if branch is provided
    if (!branch || branch.trim() === "") {
        return res.status(400).json({
            message: "New branch is required"
        });
    }

    // Find student
    const student = students.find(
        (student) => student.id === id
    );

    // If student not found
    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    // Update branch
    student.branch = branch;

    res.json({
        message: "Branch updated successfully",
        student
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});