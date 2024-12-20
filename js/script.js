function login() {
    // Redirect to the new page
    window.location.href = "window.html"; 
}

function join_class() {
    // Redirect to the new page
    window.location.href = "class.html"; 
}

function return_to_page() {
    // Redirect to the new page
    window.location.href = "window.html"; 
}

function logout() {
    // Clear session or local storage (if any)
    sessionStorage.clear();
    
    // Redirect to the login page
    window.location.href = "index.html";
}

// Parse the query string to extract the classId
function getClassId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("classId");
}

document.addEventListener("DOMContentLoaded", () => {
    const classId = getClassId();
    const heading = document.querySelector("h1");

    // Display the classId on the page
    if (classId) {
        heading.textContent = `Welcome to ${classId}!`;
    } else {
        heading.textContent = "Welcome to the Class!";
    }
});