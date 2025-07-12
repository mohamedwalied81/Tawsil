// Authentication System - Complete Solution
class Auth {
  // Initialize storage
  static initStorage() {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }
    if (!localStorage.getItem("resetTokens")) {
      localStorage.setItem("resetTokens", JSON.stringify([]));
    }
  }

  // Sign up new user
  static signup(userData) {
    Auth.initStorage();
    const users = JSON.parse(localStorage.getItem("users"));

    // Validation
    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.confirmPassword
    ) {
      return { success: false, message: "All fields are required" };
    }

    if (userData.password !== userData.confirmPassword) {
      return { success: false, message: "Passwords do not match" };
    }

    if (userData.password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters",
      };
    }

    if (users.some((user) => user.email === userData.email.toLowerCase())) {
      return { success: false, message: "Email already registered" };
    }

    if (!userData.agreeTerms) {
      return { success: false, message: "You must agree to the terms" };
    }

    if (!userData.phone || userData.phone.trim() === '' || 
    userData.phone.length < 10 || userData.phone.length > 15 || 
    !/^\d+$/.test(userData.phone)) {
      return { success: false, message: "Enter a valid phone number" };
    }

    // Create user
    const newUser = {
      id: Date.now().toString(),
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      phone: userData.phone || "",
      password: userData.password, // Note: In real app, hash this
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return { success: true, user: newUser };
  }

  // Login user
  static login(email, password) {
    Auth.initStorage();
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(
      (u) => u.email === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    if (!user.isActive) {
      return { success: false, message: "Account is deactivated" };
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    return { success: true, user };
  }

  // Request password reset
  static requestReset(email) {
    Auth.initStorage();
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find((u) => u.email === email.toLowerCase());

    if (!user) {
      return { success: false, message: "Email not found" };
    }

    // Create reset token (in real app, this would be a JWT or similar)
    const tokens = JSON.parse(localStorage.getItem("resetTokens"));
    const token = {
      email: user.email,
      token:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      expires: Date.now() + 3600000, // 1 hour from now
    };

    tokens.push(token);
    localStorage.setItem("resetTokens", JSON.stringify(tokens));

    // In a real app, you would send an email here
    console.log("Reset link:", `reset-password.html?token=${token.token}`);

    return {
      success: true,
      message: "Password reset link sent (simulated in console)",
      token: token.token,
    };
  }

  // Reset password
  static resetPassword(token, newPassword) {
    Auth.initStorage();
    const tokens = JSON.parse(localStorage.getItem("resetTokens"));
    const users = JSON.parse(localStorage.getItem("users"));

    // Find valid token
    const validToken = tokens.find(
      (t) => t.token === token && t.expires > Date.now()
    );

    if (!validToken) {
      return { success: false, message: "Invalid or expired token" };
    }

    // Find user and update password
    const userIndex = users.findIndex((u) => u.email === validToken.email);
    if (userIndex === -1) {
      return { success: false, message: "User not found" };
    }

    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    // Remove used token
    const updatedTokens = tokens.filter((t) => t.token !== token);
    localStorage.setItem("resetTokens", JSON.stringify(updatedTokens));

    return { success: true, message: "Password updated successfully" };
  }

  // Check if user is logged in
  static isLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
  }

  // Get current user
  static getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  // Logout
  static logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
  }
}

// UI Controller
class AuthUI {
  static init() {
    Auth.initStorage();

    // Initialize forms if they exist
    if (document.getElementById("login")) this.initLoginForm();
    if (document.getElementById("signup")) this.initSignupForm();
    if (document.getElementById("forgot-password"))
      this.initForgotPasswordForm();
    if (document.getElementById("reset-password")) this.initResetPasswordForm();

    // Password strength indicator
    if (document.getElementById("signup-password")) this.initPasswordStrength();
  }

  static initLoginForm() {
    const form = document.getElementById("login");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      const result = Auth.login(email, password);
      if (result.success) {
        this.showAlert("success", "Login successful! Redirecting...");
        setTimeout(() => (window.location.href = "index.html"), 1000);
      } else {
        this.showAlert("error", result.message);
      }
    });
  }

  static initSignupForm() {
    const form = document.getElementById("signup");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const userData = {
        name: document.getElementById("signup-name").value,
        email: document.getElementById("signup-email").value,
        phone: document.getElementById("signup-phone").value,
        password: document.getElementById("signup-password").value,
        confirmPassword: document.getElementById("signup-confirm").value,
        agreeTerms: document.getElementById("terms-agree").checked,
      };

      const result = Auth.signup(userData);
      if (result.success) {
        Auth.login(userData.email, userData.password); // Auto-login
        this.showAlert("success", "Account created! Redirecting...");
        setTimeout(() => (window.location.href = "index.html"), 1000);
      } else {
        this.showAlert("error", result.message);
      }
    });
  }

  static initForgotPasswordForm() {
    const form = document.getElementById("forgot-password");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("reset-email").value;

      const result = Auth.requestReset(email);
      if (result.success) {
        this.showAlert("success", result.message);
        // Store token in session for demo purposes
        sessionStorage.setItem("demoResetToken", result.token);
        setTimeout(() => {
          window.location.href = `reset-password.html?token=${result.token}`;
        }, 1500);
      } else {
        this.showAlert("error", result.message);
      }
    });
  }

  static initResetPasswordForm() {
    const form = document.getElementById("reset-password");
    if (!form) return;

    // Get token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token =
      urlParams.get("token") || sessionStorage.getItem("demoResetToken");

    if (token) {
      document.getElementById("reset-token").value = token;
    } else {
      this.showAlert("error", "Invalid reset link");
      form.style.display = "none";
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const newPassword = document.getElementById("new-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (newPassword !== confirmPassword) {
        this.showAlert("error", "Passwords do not match");
        return;
      }

      const result = Auth.resetPassword(token, newPassword);
      if (result.success) {
        this.showAlert("success", result.message);
        setTimeout(() => (window.location.href = "signin.html"), 1500);
      } else {
        this.showAlert("error", result.message);
      }
    });
  }

  static initPasswordStrength() {
    const passwordInput = document.getElementById("signup-password");
    const strengthBar = document.getElementById("password-strength-bar");

    passwordInput.addEventListener("input", (e) => {
      const password = e.target.value;
      let strength = 0;

      if (password.length > 0) strength += 20;
      if (password.length >= 6) strength += 30;
      if (/[A-Z]/.test(password)) strength += 20;
      if (/[0-9]/.test(password)) strength += 20;
      if (/[^A-Za-z0-9]/.test(password)) strength += 10;

      strength = Math.min(100, strength);
      strengthBar.style.width = strength + "%";

      if (strength < 40) strengthBar.style.backgroundColor = "#e74c3c";
      else if (strength < 70) strengthBar.style.backgroundColor = "#f39c12";
      else strengthBar.style.backgroundColor = "#2ecc71";
    });
  }

  static showAlert(type, message) {
    // Remove existing alerts
    const existingAlert = document.querySelector(".auth-alert");
    if (existingAlert) existingAlert.remove();

    // Create new alert
    const alertDiv = document.createElement("div");
    alertDiv.className = `auth-alert auth-alert-${type}`;
    alertDiv.innerHTML = message;

    // Insert alert
    const authForm =
      document.querySelector(".auth-form") ||
      document.querySelector(".container");
    if (authForm) {
      authForm.insertBefore(alertDiv, authForm.firstChild);
      setTimeout(() => alertDiv.remove(), 5000);
    }
  }
}

// Initialize when DOM loads
document.addEventListener("DOMContentLoaded", () => AuthUI.init());
