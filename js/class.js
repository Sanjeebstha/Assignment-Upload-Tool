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
        <button onclick="deleteFrame(this)" class="exit-btn">X</button>
        <div class="assignments">
            <h4>Your Assignment</h4>
            <table>
                <thead>
                    <tr>
                        <th>Assignments</th>
                        <th>Upload File</th>
                        <th>Downlaod</th>
                        <th>Scores</th>
                    </tr>
                </thead>
                <tbody id="assignmentsBody">
                    <!-- Rows will be dynamically added here -->
                    <tr>
                        <td>Assignment01</th>
                        <td>Uploaded file</th>
                        <td>Corrections <img src="../img/down.png" class="photo"></th>
                        <td>Scores</th>
                    </tr>
                    <tr>
                        <td>Assignment02</th>
                        <td>Uploaded file</th>
                        <td>Corrections <img src="../img/down.png" class="photo"></th>
                        <td>Scores</th>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="upload-container">
            <form id="uploadForm" enctype="multipart/form-data">
                <input type="file" id="assignmentFile" name="assignmentFile" required>
                <button type="submit">Upload</button>
            </form>
        </div>

        <div class="response-box1">
        <label>Your last uploaded assignment was a1. Time to upload the next one! Click on the course to see your assignments.</label>
        </div>
        <img id="avatar" src="../img/avatar1.jpg" alt="Avatar" class="avatar">

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
    `);

    studentSection.appendChild(newFrame);
}

// Add a new frame for the Tutor section
function addTutorFrame() {
    const tutorSection = document.querySelector(".tutor-section .frames-container");

    // Check if a frame already exists to avoid duplication
    if (tutorSection.querySelector(".frame")) return;

    const newFrame = createFrame(`
        <button onclick="deleteFrame(this)" class="exit-btn">X</button>
        <div class="assignments">
        <h4>Your Assignment</h4>
        <table>
            <thead>
            <tr>
              <th>Assignments</th>
              <th>Uploaded file</th>
              <th>Corrections</th>
              <th>Scores</th>
            </tr>
            </thead>
            <tr>
              <td>Assignments01</td>
              <td>Mina jansk <img src="../img/down.png" class="photo"></td>
              <td>not corrected</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Assignment01</td>
              <td>Tangla jala  <img src="../img/down.png" class="photo"></td>
              <td>not corrected</td>
              <td>-</td>
            </tr>
        </table>
        <ul id="assignmentsList">
            <!-- Dynamically populated list of assignments -->
        </ul>
        <div class="upload-container">
        <h5>Upload Results</h5>
        <form id="resultsForm" enctype="multipart/form-data">
            <input type="text" id="studentId" name="studentId" placeholder="Student ID" required>
            <input type="file" id="resultFile" name="resultFile" required>
            <button type="submit">Upload Result</button>
        </form>
        </div>
        <div class="response-box1">
        <label>Your last uploaded assignment was a1. Time to upload the next one! Click on the course.</label>
        </div>
        <img id="avatar" src="../img/avatar1.jpg" alt="Avatar" class="avatar">
        <!--
        <div class="upload-container">
        <h5>Assign Points</h5>
        <form id="pointsForm">
            <input type="text" id="pointsStudentId" name="studentId" placeholder="Student ID" required>
            <input type="number" id="points" name="points" placeholder="Points" required>
            <button type="submit">Assign Points</button>
        </form>
        </div> -->
        </div>
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
        
        <section>
            <h3>Welcome to ${classId}</h3>
            <img src="../img/class.jpg" class="photo1">
            <p>Here you can view class updates, announcements, and access learning materials.</p>
        </section>

        <section>
            <h3>Announcements</h3>
            <ul>
                <li><strong>Dec 24:</strong> Final project submissions are due on Jan 21.</li>
                <li><strong>Dec 20:</strong> New study materials have been uploaded in the Resources section.</li>
            </ul>
        </section>

        <section>
            <h3>Contact Information</h3>
            <p>If you have questions, feel free to reach out to your tutor:</p>
            <p><strong>Email:</strong> tutor@example.com</p>
            <p><strong>Office Hours:</strong> Mondays and Wednesdays, 2 PM - 4 PM</p>
        </section>
        <button onclick="deleteFrame(this)" style="cursor: pointer;">X</button>
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
