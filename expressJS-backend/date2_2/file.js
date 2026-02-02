import express from "express";

const app = express();

const PORT = 8000;

app.use(express.json());

const students = [
    { id: 1, name: "john", branch: "CSE" },
    { id: 2, name: "jane", branch: "ECE" },
    { id: 3, name: "doe", branch: "MECH" },
];

app.get("/", (req, res) => {
    res.send("Welcome to Express page");
});

app.get("/students/:id", (req, res) => {
    const id = req.params.id;

    const student = students.find(
        (student) => student.id == id
    );
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
});

app.get("/students", (req, res) => {
    const branch = req.query.branch;
    if (!branch) {
        return res.json(students); 
    }
    const foundStudents = students.filter(
        (student) => student.branch === branch
    );
    res.json(foundStudents);
});

app.post("/students/register", (req, res) => {
    const data = req.body;
    console.log("<<<",req.body);
    if(!data) {
        return res.status(400).json({ message: "Invalid student data" });
    }
    students.push(data);
    res.json(data);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
