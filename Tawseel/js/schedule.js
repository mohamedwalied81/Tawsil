// Improved route data structure that matches both the HTML structure and select options
const routeData = {
  // Main Campus Route (Sidi Gaber, Sporting → Main Campus)
  "sidi-gaber-main-campus": {
    days: ["monday", "wednesday", "friday"],
    routeName: "Main Campus Route"
  },
  "sporting-main-campus": {
    days: ["monday", "wednesday", "friday"],
    routeName: "Main Campus Route"
  },

  // Engineering Campus Route (San Stefano, Smouha → Engineering Campus)
  "san-stefano-engineering-campus": {
    days: ["tuesday", "thursday", "saturday"],
    routeName: "Engineering Campus Route"
  },
  "smouha-engineering-campus": {
    days: ["tuesday", "thursday", "saturday"],
    routeName: "Engineering Campus Route"
  },

  // Medical Campus Route (Louran, Miami → Medical Campus)
  "louran-medical-campus": {
    days: ["monday", "wednesday", "friday", "sunday"],
    routeName: "Medical Campus Route"
  },
  "miami-medical-campus": {
    days: ["monday", "wednesday", "friday", "sunday"],
    routeName: "Medical Campus Route"
  },

  // Faculty of Medicine Route
  "sidi-gaber-faculty-of-medicine": {
    days: ["monday", "wednesday", "friday"],
    routeName: "Faculty of Medicine Route"
  },
  "san-stefano-faculty-of-medicine": {
    days: ["monday", "wednesday", "friday"],
    routeName: "Faculty of Medicine Route"
  },

  // Faculty of Science Route
  "smouha-faculty-of-science": {
    days: ["tuesday", "thursday"],
    routeName: "Faculty of Science Route"
  },
  "miami-faculty-of-science": {
    days: ["tuesday", "thursday"],
    routeName: "Faculty of Science Route"
  },

  // Faculty of Business Route
  "sporting-faculty-of-business": {
    days: ["monday", "wednesday", "sunday"],
    routeName: "Faculty of Business Route"
  },
  "louran-faculty-of-business": {
    days: ["monday", "wednesday", "sunday"],
    routeName: "Faculty of Business Route"
  },
};

document.addEventListener("DOMContentLoaded", function () {
  // Initialize mini maps
  initMiniMaps();

  // Day filter functionality
  setupDayFilter();

  // Initialize the from-to selector
  initFromToSelector();
  
  // Book button handlers
  setupBookButtons();
});

function initMiniMaps() {
  // Map for card 1
  const map1 = L.map("map-preview-1").setView([31.2089, 29.9092], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map1);
  L.marker([31.2089, 29.9092]).addTo(map1).bindPopup("Main Campus");
  L.marker([31.2196, 29.9421]).addTo(map1).bindPopup("Sidi Gaber");
  L.marker([31.2001, 29.9187]).addTo(map1).bindPopup("Sporting");

  // Map for card 2
  const map2 = L.map("map-preview-2").setView([31.2089, 29.9092], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map2);
  L.marker([31.2262, 29.9563]).addTo(map2).bindPopup("San Stefano");
  L.marker([31.2089, 29.9092]).addTo(map2).bindPopup("Engineering");
  L.marker([31.21, 29.92]).addTo(map2).bindPopup("Smouha");

  // Map for card 3
  const map3 = L.map("map-preview-3").setView([31.2089, 29.9092], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map3);
  L.marker([31.23, 29.94]).addTo(map3).bindPopup("Louran");
  L.marker([31.2089, 29.9092]).addTo(map3).bindPopup("Medical Campus");
  L.marker([31.22, 29.93]).addTo(map3).bindPopup("Miami");

  // Map for card 4 (Faculty of Medicine)
  const map4 = L.map("map-preview-4").setView([31.2089, 29.9092], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map4);
  L.marker([31.2196, 29.9421]).addTo(map4).bindPopup("Sidi Gaber");
  L.marker([31.2262, 29.9563]).addTo(map4).bindPopup("San Stefano");
  L.marker([31.2119, 29.9132]).addTo(map4).bindPopup("Faculty of Medicine");

  // Map for card 5 (Faculty of Science)
  const map5 = L.map("map-preview-5").setView([31.2089, 29.9092], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map5);
  L.marker([31.21, 29.92]).addTo(map5).bindPopup("Smouha");
  L.marker([31.22, 29.93]).addTo(map5).bindPopup("Miami");
  L.marker([31.2073, 29.9129]).addTo(map5).bindPopup("Faculty of Science");

  // Map for card 6 (Faculty of Business)
  const map6 = L.map("map-preview-6").setView([31.2089, 29.9092], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map6);
  L.marker([31.2001, 29.9187]).addTo(map6).bindPopup("Sporting");
  L.marker([31.23, 29.94]).addTo(map6).bindPopup("Louran");
  L.marker([31.2076, 29.9109]).addTo(map6).bindPopup("Faculty of Business");
}

function setupDayFilter() {
  const dayButtons = document.querySelectorAll(".day-btn");

  dayButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active state
      dayButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const day = this.dataset.day;
      filterCardsByDay(day);
    });
  });

  // Show all cards initially
  filterCardsByDay("all");
}

function filterCardsByDay(day) {
  const cards = document.querySelectorAll(".schedule-card");

  cards.forEach((card) => {
    if (day === "all") {
      card.classList.add("active");
      card.style.display = "block";
    } else {
      const cardDays = card.dataset.day.split(",");
      if (cardDays.includes(day)) {
        card.classList.add("active");
        card.style.display = "block";
      } else {
        card.classList.remove("active");
        card.style.display = "none";
      }
    }
  });
}

// Initialize the from-to selector functionality
function initFromToSelector() {
  const fromSelect = document.getElementById("from-location");
  const toSelect = document.getElementById("to-location");
  const directionIcon = document.querySelector(".direction-icon");

  // Listen for changes in the selectors
  fromSelect.addEventListener("change", filterRoutes);
  toSelect.addEventListener("change", filterRoutes);

  // Direction swap functionality
  directionIcon.addEventListener("click", () => {
    const fromValue = fromSelect.value;
    const toValue = toSelect.value;

    // Swap values
    fromSelect.value = toValue;
    toSelect.value = fromValue;

    // Filter routes with new selections
    filterRoutes();
  });
}

// filter routes function
function filterRoutes() {
  const fromValue = document.getElementById("from-location").value;
  const toValue = document.getElementById("to-location").value;
  const scheduleCards = document.querySelectorAll(".schedule-card");

  // If both selections are empty, show all routes
  if (!fromValue && !toValue) {
    scheduleCards.forEach(card => {
      card.style.display = "block";
    });
    return;
  }

  scheduleCards.forEach(card => {
    // Default to hiding the card
    card.style.display = "none";
    
    const routeName = card.querySelector(".card-header h3").textContent;
    const stopsText = card.querySelector(".stops span").textContent.toLowerCase();
    const cardDays = card.getAttribute("data-day").split(",");
    
    // Check if both from and to are selected
    if (fromValue && toValue) {
      const routeKey = `${fromValue}-${toValue}`;
      const routeInfo = routeData[routeKey];
      
      // If this specific route combination exists
      if (routeInfo && routeInfo.routeName === routeName) {
        // Check if the card's days match our route days
        const hasMatchingDay = routeInfo.days.some(day => cardDays.includes(day));
        if (hasMatchingDay) {
          card.style.display = "block";
        }
      }
    }
    // If only from is selected
    else if (fromValue && !toValue) {
      // Check if the from location is in the stops text
      const fromText = fromValue.replace(/-/g, " ");
      if (stopsText.includes(fromText)) {
        card.style.display = "block";
      }
    }
    // If only to is selected
    else if (!fromValue && toValue) {
      // Check destination by comparing with the route name
      const toLocation = toValue.replace(/-/g, " ");
      const normalizedRouteName = routeName.toLowerCase();
      
      // Handle faculty vs campus naming differences
      if (toValue.startsWith("faculty-of")) {
        if (normalizedRouteName.includes(toLocation)) {
          card.style.display = "block";
        }
      } else {
        // Handle campus routes
        if (normalizedRouteName.includes(toLocation)) {
          card.style.display = "block";
        }
      }
    }
  });
}

function setupBookButtons() {
  const bookButtons = document.querySelectorAll(".btn-book");

  bookButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get the route name from the closest heading or card title
      const card = this.closest(".schedule-card");
      const routeName = card
        ? card.querySelector(".card-header h3").textContent
        : "this route";

      // Show success message
      showSuccessMessage(
        `Ticket booked successfully for ${routeName}! You will receive a SMS on your phone number when the bus reaches you.`
      );
    });
  });
}

function showSuccessMessage(message) {
  // Create toast element
  const toast = document.createElement("div");
  toast.className = "success-toast";
  toast.innerHTML = `
  <div class="toast-content">
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
  </div>
`;

  // Add styles
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "15px 20px",
    borderRadius: "4px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    zIndex: "1000",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    opacity: "1",
    transition: "opacity 0.5s ease",
  });

  // Add to document
  document.body.appendChild(toast);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500);
  }, 3000);
}

function showAlert(message, type) {
  const alert = document.createElement("div");
  alert.className = `auth-alert auth-alert-${type}`;
  alert.textContent = message;

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.style.opacity = "0";
    setTimeout(() => alert.remove(), 300);
  }, 3000);
}