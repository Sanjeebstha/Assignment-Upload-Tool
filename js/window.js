function logout() {
    // Clear session or local storage (if any)
    sessionStorage.clear();
    
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