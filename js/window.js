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
        <button onclick="deleteFrame(this)">Delete Class</button>
        <button onclick="join_class('${classId}')" class="join-btn">Join</button>
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
    // Navigate to class.html and pass the class ID as a query parameter
    window.location.href = `class.html?classId=${classId}`;
}
