// import express from "express";
// import fs from "fs";

// const app = express();
// const PORT = 3000;

// app.use(express.json());

// const students = [
//     { id: 1, name: "john", branch: "CSE" },
//     { id: 2, name: "jane", branch: "ECE" },
//     { id: 3, name: "doe", branch: "MECH" },
// ];

// // home page open hoga
// app.get("/", (req, res) => {
//     res.send("Welcome to Express page");
// });

// // all students ka data milega + agar branch doge toh uske according bhi milega
// // app.get("/students", (req, res) => {
// //     const branch = req.query.branch;

// //     if (branch) {
// //         const filtered = students.filter(
// //             (student) => student.branch === branch
// //         );

// //         return res.json(filtered);
// //     }

// //     res.json(students);
// // });

// // kisi ek student ka data milega id ke through
// app.get("/students/:id", (req, res) => {
//     const id = Number(req.params.id);

//     const student = students.find(
//         (student) => student.id === id
//     );

//     if (!student) {
//         return res.status(404).json({
//             message: "Student not found"
//         });
//     }

//     res.json(student);
// });

// // new student ko register karne ke liye
// // app.post("/students/register", (req, res) => {
// //     const { id, name, branch } = req.body;

// //     console.log("<<<", req.body);

// //     // check karega if all field are given
// //     if (!id || !name || !branch) {
// //         return res.status(400).json({
// //             message: "All fields (id, name, branch) are required"
// //         });
// //     }

// //     // check karega if student with same id already exists
// //     const exists = students.find(
// //         (student) => student.id === id
// //     );

// //     // if exists, toh error dega
// //     if (exists) {
// //         return res.status(409).json({
// //             message: "Student with this ID already exists"
// //         });
// //     }

// //     // new student ko add karega
// //     const newStudent = {
// //         id,
// //         name,
// //         branch
// //     };

// //     students.push(newStudent);

// //     res.status(201).json({
// //         message: "Student registered successfully",
// //         student: newStudent
// //     });
// // });

// // existing student ka name & branch update karne ke liye (using spread)
// app.put("/students/update/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const { name, branch } = req.body;

//     // At least one field required
//     if (!name && !branch) {
//         return res.status(400).json({
//             message: "At least name or branch is required"
//         });
//     }

//     // Find index
//     const index = students.findIndex(
//         (student) => student.id === id
//     );

//     // If student not found
//     if (index === -1) {
//         return res.status(404).json({
//             message: "Student not found"
//         });
//     }

//     // Old student
//     const oldStudent = students[index];

//     // New updated student (Spread Operator)
//     const updatedStudent = {
//         ...oldStudent,   // copy old data
//         ...(name && { name }),     // update if name exists
//         ...(branch && { branch })  // update if branch exists
//     };

//     // Replace in array
//     students[index] = updatedStudent;

//     res.json({
//         message: "Updated successfully",
//         student: updatedStudent
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


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
