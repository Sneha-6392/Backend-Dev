import express from "express";
import fs from "fs/promises";
const app = express();

app.use(express.json());

const FILE = "students.json";

const PORT = 8000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});

app.use((req, res, next) => {
    console.log("i'm middleware 1");
    next();
});

app.use((req, res, next) => {
    console.log("i'm middleware 2");
    next();
});

const fileAuthMiddleware = (req, res, next) => {
    console.log("i' m checking file access");
    next();
};

app.use((req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(400).send("please provide token");
    }
    if(token === "secrettoken") {
        next();
    }
    else {
        return res.status(401).send("Unauthorized");
    }
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

const loggerMiddleware = (req, res, next) => {
    const startTime = new Date();
    res.on("finish", async () => {
        const log = `[${startTime.toLocaleString()}] ${req.method} ${req.originalUrl} ${res.statusCode}\n`;
        try {

            await fs.appendFile("logs.txt", log);
        } catch (err) {
            console.error("Error writing log file", err);
        }
    });
    next();
};

app.use(loggerMiddleware);

// Get all students
app.get("/students", fileAuthMiddleware, async (req, res) => {
    try {
        const students = await readStudentFromFile();
        res.json(students);
    } catch (err) {
        res.status(500).send("Error reading file");
    }
});
