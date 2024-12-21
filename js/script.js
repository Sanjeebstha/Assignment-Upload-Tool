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