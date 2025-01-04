// Retrieve the username from localStorage 
window.onload = function () {
    const username = localStorage.getItem("username");

    // Display the username in the navigation bar or another appropriate place
    if (username) {
        // Add the welcome message to the navigation bar
        const topnav = document.querySelector(".header");
        const welcomeMessage = document.createElement("span");
        welcomeMessage.style.float = "right"; // Align to the right side
        welcomeMessage.style.padding = "14px 16px"; // Match existing nav styling
        welcomeMessage.innerText = `Welcome, ${username}!`;
        topnav.appendChild(welcomeMessage);
    } else {
        // If no username is stored, redirect back to the login page
        window.location.href = "index.html";
    }
};

function logout() {
    localStorage.removeItem("username");
    
    // Redirect to the login page
    window.location.href = "index.html";
}

// Function to handle page navigation based on selection(combo box)
 function navigateToPage(course) {
    if (course) {
        // Navigate to a dynamically generated page
        window.location.href = `/class.html?course=${course}`;
    }
}