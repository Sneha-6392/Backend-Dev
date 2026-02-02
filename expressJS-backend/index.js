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

app.get("/user", (req, res) => {
    res.send("Welcome to User page");
});

app.get("/students", (req, res) => {
    res.json(students);
});

app.get("/students/:id", (req, res) => {
    res.send("")
});   

app.get("/students/search", (req, res) => {
    const searchQuery = req.query;
    console.log("Search Query:", searchQuery);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
