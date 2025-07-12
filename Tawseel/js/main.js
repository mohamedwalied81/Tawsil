// Initialize the map when the page loads

// Check if user is logged in
function checkAuthStatus() {
  return localStorage.getItem("isLoggedIn") === "true";
}

// Update navigation based on auth status
function updateNavigation() {
  // Check if user is logged in
  if (checkAuthStatus()) {
    // User is logged in - hide auth buttons and show profile menu
    document.getElementById("authButtons").style.display = "none";
    document.getElementById("profileMenu").style.display = "block";
  } else {
    // User is not logged in - show auth buttons and hide profile menu
    document.getElementById("authButtons").style.display = "block";
    document.getElementById("profileMenu").style.display = "none";
  }
}

// Logout functionality
// Logout functionality - stay on the current page
document.getElementById("logoutBtn")?.addEventListener("click", function (e) {
  e.preventDefault();
  // Set logged in status to false
  localStorage.setItem("isLoggedIn", "false");
  // Update the navigation UI
  updateNavigation();
  
  document.body.appendChild(confirmationMessage);
  
  // Remove the message after 3 seconds
  setTimeout(() => {
    document.body.removeChild(confirmationMessage);
  }, 3000);
});

// Initialize navigation
document.addEventListener("DOMContentLoaded", function () {
  updateNavigation();
  
  // REMOVED THE PROBLEMATIC EVENT LISTENERS THAT WERE PREVENTING NAVIGATION
  // The auth buttons will now work as regular links without interference
});

// Enhanced Profile Dropdown Interaction
const profileMenu = document.getElementById("profileMenu");
const profileIcon = document.getElementById("profileIcon");

if (profileMenu && profileIcon) {
  let isDropdownOpen = false;

  // Toggle dropdown on click
  profileIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    isDropdownOpen = !isDropdownOpen;
    const dropdown = profileMenu.querySelector(".dropdown-content");

    if (isDropdownOpen) {
      dropdown.style.display = "block";
      dropdown.style.animation = "fadeIn 0.3s ease forwards";
    } else {
      dropdown.style.animation = "";
      setTimeout(() => {
        dropdown.style.display = "none";
      }, 300);
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", () => {
    if (isDropdownOpen) {
      const dropdown = profileMenu.querySelector(".dropdown-content");
      dropdown.style.animation = "";
      setTimeout(() => {
        dropdown.style.display = "none";
      }, 300);
      isDropdownOpen = false;
    }
  });
}