import express from "express";

const app = express();

const PORT = 8000;

const students = [
    { id:1, name: "john", branch: "CSE" },
    { id:2, name: "jane", branch: "ECE" },
    { id:3, name: "doe", branch: "MECH" },
];

app.get("/", (req, res) => {
    res.send("Welcome to Express page");
});

app.get("/students/:id", (req, res) => {
    const id = params.id;
    const arrayIndex = students.findIndex((student) => student.id == id);
    const data = students[arrayIndex];
    res.json(data);
});   

app.get("/students", (req, res) => {
    const branch = req.query.branch;
    const foundStudents = students.filter((student) => student.branch === branch);
    res.json(foundStudents);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
