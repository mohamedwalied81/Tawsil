document.addEventListener("DOMContentLoaded", function () {
  // Initialize Map
  if (document.getElementById("map")) {
    const map = L.map("map").setView([31.2001, 29.9187], 13); // Alexandria

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);


    // Pickup points
    const faculties = [
      { coords: [31.2073, 29.9129], label: "Faculty of Science" },
      { coords: [31.2076, 29.9109], label: "Faculty of Business" },
      { coords: [31.2081, 29.9145], label: "Faculty of Engineering" },
      { coords: [31.2066, 29.9152], label: "Faculty of Law" },
      { coords: [31.2095, 29.9117], label: "Faculty of Fine Arts" },
      {
        coords: [31.2105, 29.9139],
        label: "Faculty of Physical Education for Girls",
      },
      { coords: [31.2088, 29.9163], label: "Faculty of Agriculture" },
      {
        coords: [31.2099, 29.9174],
        label: "Faculty of Agriculture - Saba basha",
      },
      { coords: [31.2112, 29.9141], label: "Faculty of Dentistry" },
      { coords: [31.2071, 29.9158], label: "Faculty of Veterinary Medicine" },
      { coords: [31.2063, 29.9137], label: "Faculty of Education" },
      { coords: [31.2082, 29.9126], label: "Faculty of Tourism and Hotels" },
      { coords: [31.2094, 29.9148], label: "Faculty of Nursing" },
      { coords: [31.2052, 29.9133], label: "Faculty of Arts" },
      { coords: [31.2078, 29.9171], label: "Faculty of Fishing" },
      { coords: [31.2091, 29.9185], label: "Faculty of Specific Education" },
      {
        coords: [31.2069, 29.9193],
        label: "Faculty of Economic Studies and Political Science",
      },
    ];

    // Create a custom faculty icon
    const facultyIcon = L.icon({
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Add faculty markers
    faculties.forEach((f) => {
      L.marker(f.coords, { icon: facultyIcon }).addTo(map).bindPopup(f.label);
    });

    // Bus stop locations
    const busStops = [
      { coords: [31.2196, 29.9421], label: "Sidi Gaber Bus Stop 🚏" },
      { coords: [31.2001, 29.9187], label: "Sporting Bus Stop 🚏" },
      { coords: [31.2262, 29.9563], label: "San Stefano Bus Stop 🚏" },
      { coords: [31.21, 29.92], label: "Smouha Bus Stop 🚏" },
      { coords: [31.22, 29.93], label: "Miami Bus Stop 🚏" },
    ];

    // Create a custom bus stop icon
    const busStopIcon = L.icon({
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Add bus stop markers
    busStops.forEach((stop) => {
      L.marker(stop.coords, { icon: busStopIcon })
        .addTo(map)
        .bindPopup(stop.label);
    });

    // Update bounds to include all markers
    const allPoints = [...faculties, ...busStops, ...pickups];
    const allMarkers = L.featureGroup(
      allPoints.map((p) => L.marker(p.coords))
    ).addTo(map);
    map.fitBounds(allMarkers.getBounds().pad(0.2));

    // Update nav based on auth status
    function checkAuthStatus() {
      return localStorage.getItem("isLoggedIn") === "true";
    }

    function updateNavigation() {
      const authButtons = document.getElementById("authButtons");
      const profileMenu = document.getElementById("profileMenu");

      if (checkAuthStatus()) {
        authButtons.style.display = "none";
        profileMenu.style.display = "block";
      } else {
        authButtons.style.display = "block";
        profileMenu.style.display = "none";
      }
    }

    updateNavigation();
  }
});
