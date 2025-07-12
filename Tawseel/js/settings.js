// settings.js - Functionality for the settings page

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkLoginStatus();
    
    // Set up tab switching functionality
    setupTabs();
    
    // Set up form submission handlers
    setupFormHandlers();
    
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
  
  function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and content
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(`${tabId}-tab`).classList.add('active');
      });
    });
  }
  
  function setupFormHandlers() {
    // Profile form submission
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
          fullName: document.getElementById('fullName').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          studentId: document.getElementById('studentId').value,
          faculty: document.getElementById('faculty').value
        };
        
        // Save to localStorage
        localStorage.setItem('userData', JSON.stringify(formData));
        
        // In a real application, you would send this data to an API
        console.log('Profile data saved:', formData);
        
        // Show success message
        showNotification('Profile information updated successfully!');
      });
    }
    // Set up other form handlers as needed for notifications, preferences, security tabs
    const notificationsTab = document.getElementById('notifications-tab');
    if (notificationsTab) {
      const notifForm = notificationsTab.querySelector('.settings-form');
      notifForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Notification preferences updated successfully!');
      });
    }
    
    const preferencesTab = document.getElementById('preferences-tab');
    if (preferencesTab) {
      const prefForm = preferencesTab.querySelector('.settings-form');
      prefForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Preferences updated successfully!');
      });
    }
    
    const securityTab = document.getElementById('security-tab');
    if (securityTab) {
      const securityForm = securityTab.querySelector('.settings-form');
      securityForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Password validation would go here in a real application
        const newPass = document.getElementById('newPassword').value;
        const confirmPass = document.getElementById('confirmPassword').value;
        
        if (newPass !== confirmPass) {
          showNotification('Passwords do not match!', 'error');
          return;
        }
        
        showNotification('Password updated successfully!');
      });
    }
  }
  
  function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Append to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Hide and remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
  
  function logoutUser() {
    // In a real application, this would clear session data, tokens, etc.
    console.log('User logged out');
    
    // Redirect to login page
    window.location.href = 'signin.html';
  }
  function loadUserSettings() {
    // Try to get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    // If data exists in localStorage, fill in the form
    if (userData) {
      document.getElementById('fullName').value = userData.fullName || 'John Doe';
      document.getElementById('email').value = userData.email || 'johndoe@example.com';
      document.getElementById('phone').value = userData.phone || '+20 123 456 7890';
      document.getElementById('studentId').value = userData.studentId || 'ALEX-12345';
      
      // Set faculty select if it exists
      const facultySelect = document.getElementById('faculty');
      if (facultySelect && userData.faculty) {
        facultySelect.value = userData.faculty;
      }
    }
  }
  
  // Update the DOMContentLoaded event listener
  document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkLoginStatus();
    
    // Load saved settings
    loadUserSettings();
    
    // Set up tab switching functionality
    setupTabs();
    
    // Set up form submission handlers
    setupFormHandlers();
    
    // Set up logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
      e.preventDefault();
      logoutUser();
    });
  });