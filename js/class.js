// Show the return icon and redirect to the homepage
function return_to_page() {
    window.location.href = "window.html";
}

// Select role and show relevant section
function selectRole(role) {
    const roleSelection = document.querySelector(".role-selection");
    const studentSection = document.querySelector(".student-section");
    const tutorSection = document.querySelector(".tutor-section");

    // Hide role selection
    roleSelection.classList.add("hidden");

    // Show the selected role's section
    if (role === "student") {
        studentSection.classList.remove("hidden");
        addStudentFrame();
    } else if (role === "tutor") {
        tutorSection.classList.remove("hidden");
        addTutorFrame();
    }
}

function updateAssignmentsTable(uploadedFile) {
    const assignmentsTableBody = document.querySelector("#assignmentsBody");

    if (!assignmentsTableBody) {
        console.error("Assignments table body not found.");
        return;
    }

    // Create a new table row
    const newRow = document.createElement("tr");

    // Populate the row with file details
    newRow.innerHTML = `
        <td>${uploadedFile.name}</td>
        <td><a href="${uploadedFile.url}" download>Download</a></td>
        <td>Pending</td>
        <td>-</td>
    `;

    // Append the new row to the table body
    assignmentsTableBody.appendChild(newRow);
}

// Add a new frame for the Student section
function addStudentFrame() {
    const studentSection = document.querySelector(".student-section .frames-container");

    // Check if a frame already exists to avoid duplication
    if (studentSection.querySelector(".frame")) return;

    const newFrame = createFrame(`
        <div class="assignments">
            <h4>Upload Your Assignment</h4>
            <table>
                <thead>
                    <tr>
                        <th>Assignments</th>
                        <th>Upload file</th>
                        <th>Corrections</th>
                        <th>Scores</th>
                    </tr>
                </thead>
                <tbody id="assignmentsBody">
                    <!-- Rows will be dynamically added here -->
                    <tr>
                        <td>Assignments1</th>
                        <td>Upload file</th>
                        <td>Corrections</th>
                        <td>Scores</th>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="upload">
            <form id="uploadForm" enctype="multipart/form-data">
                <input type="file" id="assignmentFile" name="assignmentFile" required>
                <button type="submit">Upload</button>
            </form>
        </div>

        <!--
        <div class="download">
            <h4>Your Corrections</h4>
            <ul id="correctionsList">
                
            </ul>
        </div>
        
        <div class="points">
            <h4>Your Points</h4>
            <p id="pointsDisplay">Loading points...</p>
        </div>
        -->
        <button onclick="deleteFrame(this)" style="cursor: pointer;">Exit</button>
    `);

    studentSection.appendChild(newFrame);
}

// Add a new frame for the Tutor section
function addTutorFrame() {
    const tutorSection = document.querySelector(".tutor-section .frames-container");

    // Check if a frame already exists to avoid duplication
    if (tutorSection.querySelector(".frame")) return;

    const newFrame = createFrame(`
        <table>
            <tr>
              <th>Assignments</th>
              <th>Uploaded file</th>
              <th>Corrections</th>
              <th>Scores</th>
            </tr>
            <tr>
              <td>Upload</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>9</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Mexico</td>
              <td>9</td>
            </tr>
        </table>
        <ul id="assignmentsList">
            <!-- Dynamically populated list of assignments -->
        </ul>
        <h4>Upload Results</h4>
        <form id="resultsForm" enctype="multipart/form-data">
            <input type="text" id="studentId" name="studentId" placeholder="Student ID" required>
            <input type="file" id="resultFile" name="resultFile" required>
            <button type="submit">Upload Result</button>
        </form>
        <h4>Assign Points</h4>
        <form id="pointsForm">
            <input type="text" id="pointsStudentId" name="studentId" placeholder="Student ID" required>
            <input type="number" id="points" name="points" placeholder="Points" required>
            <button type="submit">Assign Points</button>
        </form>
        <button onclick="deleteFrame(this)" style="cursor: pointer;">Exit</button>
    `);

    tutorSection.appendChild(newFrame);
    // Fetch and display assignments for the class
    fetchAssignmentsForClass();
}

// Function to fetch and display assignments
async function fetchAssignmentsForClass() {
    const classId = getClassId();
    if (!classId) {
        console.error("Class ID not found.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/getAssignments?classId=${classId}`);
        if (!response.ok) throw new Error("Failed to fetch assignments.");

        const assignments = await response.json();
        const assignmentsList = document.getElementById("assignmentsList");

        assignmentsList.innerHTML = ""; // Clear any existing assignments

        assignments.forEach((assignment) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="${assignment.url}" download>${assignment.name}</a>`;
            assignmentsList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching assignments:", error);
    }
}


// Create a reusable frame
function createFrame(content) {
    const frame = document.createElement("div");
    frame.classList.add("frame");
    frame.innerHTML = content;
    return frame;
}

// Delete a frame
function deleteFrame(button) {
    button.parentElement.remove();
}

// Handle assignment uploads, points, and result submissions
document.addEventListener("DOMContentLoaded", () => {
    // Simulate fetching assignments
    fetchAssignments().then((assignments) => {
        const assignmentsList = document.getElementById("assignmentsList");
        if (assignmentsList) {
            assignments.forEach((assignment) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<a href="${assignment.url}" download>${assignment.name}</a>`;
                assignmentsList.appendChild(listItem);
            });
        }
    });

    // Handle assignment upload
    document.addEventListener("submit", async (event) => {
        const form = event.target;
        if (form.id === "uploadForm" || form.id === "resultsForm" || form.id === "pointsForm") {
            event.preventDefault();
            const formData = new FormData(form);

            let url, method, body;

            if (form.id === "uploadForm") {
                url = `http://localhost:3000/uploadAssignment?classId=${getClassId()}`;
                method = "POST";
                body = formData;
            } else if (form.id === "resultsForm") {
                url = `/uploadResult`;
                method = "POST";
                body = formData;
            } else if (form.id === "pointsForm") {
                const pointsData = Object.fromEntries(formData.entries());
                url = `/assignPoints`;
                method = "POST";
                body = JSON.stringify(pointsData);
            }

            try {
                const response = await fetch(url, {
                    method,
                    body: form.id === "pointsForm" ? body : formData,
                    headers: form.id === "pointsForm" ? { "Content-Type": "application/json" } : {},
                });

                if (response.ok) {
                    const result = await response.json(); // Parse the JSON response
                    alert("File uploaded successfully!");

                    // Add the uploaded file to the assignments table
                    if (form.id === "uploadForm") {
                        updateAssignmentsTable(result);
                    }

                    // Add the uploaded file to the corrections list
                    const correctionsList = document.querySelector("#correctionsList");
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `<a href="${result.url}" download>${result.name}</a>`;
                    correctionsList.appendChild(listItem);
                } else {
                    alert("Failed to complete the operation.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            }
        }
    });
});

// Simulate fetching assignments
async function fetchAssignments() {
    try {
        const response = await fetch(`http://localhost:3000/getAssignments?classId=${getClassId()}`);
        const assignments = await response.json();

        const assignmentsList = document.getElementById("assignmentsList");
        assignmentsList.innerHTML = ""; // Clear existing content

        assignments.forEach((assignment) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="${assignment.url}" download>${assignment.name}</a>`;
            assignmentsList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching assignments:", error);
    }
}

// Call this function when the tutor interface is loaded
document.addEventListener("DOMContentLoaded", fetchAssignments);

// For creating class
let classCounter = 1; // Counter to uniquely identify each class
function createClass() {
    // Get the container for all frames
    const dashboard = document.querySelector(".dashboard");

    // Create a new frame (div)
    const newFrame = document.createElement("div");
    newFrame.classList.add("frame1");

    // Assign a unique class ID
    const classId = `class-${classCounter++}`;

    // Add content to the new frame
    newFrame.innerHTML = `
        <h2>${classId}</h2>
        <p>This is a dynamically created class.</p>
        <button onclick="deleteFrame(this)" style="cursor: pointer;">Delete Class</button>
        <button onclick="join_class('${classId}')" class="join-btn" style="cursor: pointer;">Join</button>
    `;

    // Append the new frame to the dashboard
    dashboard.appendChild(newFrame);
}

function deleteFrame(button) {
    // Remove the frame (parent of the button) from the dashboard
    const frame = button.parentElement;
    frame.remove();
}

function join_class() {
    // Redirect to the new page
    window.location.href = "class1.html"; 
}

// Parse the query string to extract the classId
function getClassId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("classId");
}
