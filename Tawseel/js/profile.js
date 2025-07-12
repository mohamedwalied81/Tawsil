// profile.js - Functionality for the profile page

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkLoginStatus();
    
    // Load user profile data
    loadUserProfile();
  
    // Set up logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
      e.preventDefault();
      logoutUser();
    });
  });
  
  function checkLoginStatus() {
    // For demonstration purposes, we're assuming the user is logged in
    // In a real application, you would check session/localStorage/cookies
    const isLoggedIn = true;
    
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      window.location.href = 'signin.html';
    }
  }
  
// profile.js - Update this function

function loadUserProfile() {
    // Try to get user data from localStorage
    let userData = JSON.parse(localStorage.getItem('userData'));
    
    // If no data in localStorage, use default data
    if (!userData) {
      userData = {
        fullName: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+20 123 456 7890',
        studentId: 'ALEX-12345',
        faculty: 'Engineering'
      };
    }
    
    // Stats data (could also be stored in localStorage in a real app)
    const statsData = {
      ridesCount: 12,
      favoriteRoute: 'Smouha ↔ Main Campus',
      savedAmount: '150 EGP'
    };
    
    // Update DOM with user data
    document.getElementById('userName').textContent = userData.fullName;
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('userPhone').textContent = userData.phone;
    document.getElementById('studentId').textContent = userData.studentId;
    
    // Update stats
    document.getElementById('ridesCount').textContent = statsData.ridesCount;
    document.getElementById('favRoute').textContent = statsData.favoriteRoute;
    document.getElementById('savedAmount').textContent = statsData.savedAmount;
  }
  
  function logoutUser() {
    // In a real application, this would clear session data, tokens, etc.
    console.log('User logged out');
    
    // Redirect to login page
    window.location.href = 'signin.html';
  }