function join_class() {
    // Redirect to the new page
    window.location.href = "class.html"; 
}

function return_to_page() {
    // Redirect to the new page
    window.location.href = "window.html"; 
}

function selectRole(role) {
     // Hide the role selection
     document.querySelector(".role-selection").classList.add("hidden");

     if (role === "student") {
         const studentSection = document.querySelector(".student-section");
         const framesContainer = studentSection.querySelector(".frames-container");
 
         // Show the student section
         studentSection.classList.remove("hidden");
    // Create a new frame
    const newFrame = document.createElement("div");
    newFrame.classList.add("frame");

    // Add content to the frame
    newFrame.innerHTML = `
         <!-- Upload Section -->
          <div class="upload">
              <h4>Upload Your Assignment</h4>
              <form id="uploadForm" enctype="multipart/form-data">
                  <input type="file" id="assignmentFile" name="assignmentFile" required>
                  <button type="submit">Upload</button>
              </form>
          </div>
          <!-- Download Section -->
          <div class="download">
              <h4>Your Corrections</h4>
              <ul id="correctionsList">
                  <!-- List of corrections dynamically loaded here -->
              </ul>
          </div>
          <!-- Points Section -->
          <div class="points">
              <h4>Your Points</h4>
              <p id="pointsDisplay">Loading points...</p>
          </div>
          <button onclick="deleteFrame(this)" style="cursor: pointer;">Delete Frame</button>
    `;

    // Append the frame to the student section
    framesContainer.appendChild(newFrame);
} else if  (role === "tutor") {

    const tutorSection = document.querySelector(".tutor-section");
         const framesContainer = tutorSection.querySelector(".frames-container");
    
         // Show the student section
         tutorSection.classList.remove("hidden");
    
    // Create a new frame
    const newFrame = document.createElement("div");
    newFrame.classList.add("frame");
    
    // Add content to the frame
    newFrame.innerHTML = `
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
        <button onclick="deleteFrame(this)" style="cursor: pointer;">Delete Frame</button>
    `;
    
    // Append the frame to the tutor section
    framesContainer.appendChild(newFrame);
}
}




function deleteFrame(button) {
    // Remove the frame (parent of the button)
    const frame = button.parentElement;
    frame.remove();
}
