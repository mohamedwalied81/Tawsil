document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader-wrapper');
    const LOADING_DURATION = 3000; // Reduced from 6000 to 3000 ms (3 seconds)
    
    if (loader) {
      // Show loader immediately
      loader.style.display = 'flex';
      
      // Add slight bounce effect to bus
      const bus = document.querySelector('.bus');
      let bounceInterval;
      
      if (bus) {
        bounceInterval = setInterval(() => {
          if (!loader.classList.contains('loader-complete')) {
            bus.style.transform = `translateY(${Math.random() * 6 - 3}px)`;
          }
        }, 300); // Slightly faster bounce
      }
      
      // When loading is complete
      setTimeout(function() {
        // Add complete class to trigger CSS transitions
        loader.classList.add('loader-complete');
        
        // Clear bounce effect
        clearInterval(bounceInterval);
        
        // After transitions finish, hide loader
        setTimeout(function() {
          loader.style.opacity = '0';
          setTimeout(function() {
            loader.style.display = 'none';
          }, 500); // Slightly faster fade out
        }, 800); // Reduced from 1500ms to match faster speed
      }, LOADING_DURATION); // Now completes in 3 seconds instead of 6
    }
  });