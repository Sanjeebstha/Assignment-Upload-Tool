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
