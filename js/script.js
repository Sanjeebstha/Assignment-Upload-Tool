function login() {
    const username = document.getElementById("username").value; // Get the entered username

    if (username) {
        // Store the username in localStorage
        localStorage.setItem("username", username);

        // Redirect to the new page
        window.location.href = "window.html"; 
    } else {
        alert("Please enter your username."); 
    }
}



