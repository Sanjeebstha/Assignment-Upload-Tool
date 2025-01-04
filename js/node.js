const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({ origin: "http://127.0.0.1:5500" })); // Erlaubt Anfragen von Ihrem Frontend-Server
app.use(bodyParser.json()); // Middleware to parse JSON requests
// Configure Multer to store uploaded files in a directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Store files in an "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to avoid name conflicts
    },
});

const upload = multer({ storage });

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Store assignments in-memory or in a database (e.g., MongoDB)
const assignments = [];
const results = [];
const points = {};

// Endpoint to handle file uploads
app.post("/uploadAssignment", upload.single("assignmentFile"), (req, res) => {
    if (!req.file) {
        console.error("File upload failed: No file received");
        return res.status(400).send("No file uploaded.");
    }

    console.log("File uploaded successfully:");
    console.log(`Original name: ${req.file.originalname}`);
    console.log(`Stored path: ${req.file.path}`);

    const assignment = {
        classId: req.query.classId,
        name: req.file.originalname,
        url: `/uploads/${req.file.filename}`,
    };

    assignments.push(assignment); // Save assignment
    res.json(assignment);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Endpoint to fetch assignments for a specific class
app.get("/getAssignments", (req, res) => {
    const classId = req.query.classId;
    if (!classId) {
        return res.status(400).send("classId is required.");
    }
    const classAssignments = assignments.filter((a) => a.classId === classId);
    res.json(classAssignments);
});

// Optional: Define a root endpoint for testing
app.get("/", (req, res) => {
    res.send("Welcome to the File Upload Server! Use /uploadAssignment to upload files.");
});

// Endpoint to upload results
app.post("/uploadResult", upload.single("resultFile"), (req, res) => {
    if (!req.file) {
        console.error("File upload failed: No file received");
        return res.status(400).send("No file uploaded.");
    }

    const result = {
        studentId: req.body.studentId,
        name: req.file.originalname,
        url: `/uploads/${req.file.filename}`,
    };

    results.push(result); // Save result
    res.json(result);
});

// Endpoint to assign points to a student
app.post("/assignPoints", (req, res) => {
    const { studentId, points: studentPoints } = req.body;

    if (!studentId || !studentPoints) {
        return res.status(400).send("studentId and points are required.");
    }

    points[studentId] = (points[studentId] || 0) + parseInt(studentPoints, 10); // Add points
    res.json({ studentId, points: points[studentId] });
});

// Endpoint to fetch points for a specific student
app.get("/getPoints", (req, res) => {
    const studentId = req.query.studentId;
    if (!studentId) {
        return res.status(400).send("studentId is required.");
    }

    res.json({ studentId, points: points[studentId] || 0 });
});