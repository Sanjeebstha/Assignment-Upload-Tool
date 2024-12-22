function logout() {
    // Clear session or local storage (if any)
    sessionStorage.clear();
    
    // Redirect to the login page
    window.location.href = "index.html";
}

// Function to handle page navigation based on selection
 function navigateToPage(course) {
    if (course) {
        // Navigate to a dynamically generated page
        window.location.href = `/class.html?course=${course}`;
    }
}

let classCounter = 1; // Counter to uniquely identify each class
function createClass() {
    // Get the container for all frames
    const dashboard = document.querySelector(".dashboard");

    // Create a new frame (div)
    const newFrame = document.createElement("div");
    newFrame.classList.add("frame");

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

function join_class(classId) {
    // Navigate to class.html and pass the class ID as a query parameter
    window.location.href = `class.html?classId=${classId}`;
}

// Parse the query string to extract the classId
function getClassId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("classId");
}

 // Dynamically update the page content
 document.addEventListener("DOMContentLoaded", () => {
    const classId = getClassId();
    //const heading = document.querySelector("h1");
    const content = document.querySelector(".content");

    if (classId) {
        // Update the heading and content with the classId
        //heading.textContent = `Welcome to ${classId}!`;
        content.innerHTML = `
            <p>You're now viewing content for ${classId}.</p>
            <p>Enjoy your class session!</p>
        `;
    } else {
        heading.textContent = "Class Not Found";
        content.innerHTML = `<p>Sorry, we couldn't find the class you're looking for.</p>`;
    }
});



 // Extract classId from URL
 function getClassId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("classId");
}

document.addEventListener("DOMContentLoaded", () => {
    const studentSection = document.querySelector(".student-section");
    const tutorSection = document.querySelector(".tutor-section");

    // Role selection
    window.selectRole = (role) => {
        if (role === "student") {
            studentSection.classList.remove("hidden");
            tutorSection.classList.add("hidden");
        } else if (role === "tutor") {
            tutorSection.classList.remove("hidden");
            studentSection.classList.add("hidden");
        }
    };

    // Simulate fetching assignments for tutor
    const assignmentsList = document.getElementById("assignmentsList");
    fetchAssignments().then((assignments) => {
        assignments.forEach((assignment) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <a href="${assignment.url}" download>${assignment.name}</a>
            `;
            assignmentsList.appendChild(listItem);
        });
    });

    // Simulate assignment upload by student
    const uploadForm = document.getElementById("uploadForm");
    uploadForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(uploadForm);

        try {
            const response = await fetch(`/uploadAssignment?classId=${getClassId()}`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Assignment uploaded successfully!");
            } else {
                alert("Failed to upload assignment.");
            }
        } catch (error) {
            console.error("Error uploading assignment:", error);
            alert("An error occurred. Please try again.");
        }
    });

    // Handle result uploads by tutor
    const resultsForm = document.getElementById("resultsForm");
    resultsForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(resultsForm);

        try {
            const response = await fetch(`/uploadResult`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Result uploaded successfully!");
            } else {
                alert("Failed to upload result.");
            }
        } catch (error) {
            console.error("Error uploading result:", error);
            alert("An error occurred. Please try again.");
        }
    });

    // Handle point assignment by tutor
    const pointsForm = document.getElementById("pointsForm");
    pointsForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const studentId = document.getElementById("pointsStudentId").value;
        const points = document.getElementById("points").value;

        try {
            const response = await fetch(`/assignPoints`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ studentId, points }),
            });

            if (response.ok) {
                alert("Points assigned successfully!");
            } else {
                alert("Failed to assign points.");
            }
        } catch (error) {
            console.error("Error assigning points:", error);
            alert("An error occurred. Please try again.");
        }
    });
});

// Simulate fetching assignments for tutor
async function fetchAssignments() {
    // Replace this with actual server request
    return [
        { name: "Assignment 1", url: "/assignments/assignment1.pdf" },
        { name: "Assignment 2", url: "/assignments/assignment2.pdf" },
    ];
}

// Helper to get classId
function getClassId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("classId");
}