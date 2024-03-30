function load() {
  let body = document.getElementsByTagName('body')[0];

  // Check Preferred Color Scheme
  detectColorScheme(body);
}

/**
 * Automatically Detects and Sets the user preferred color scheme
 * 
 * @param body Document Body
 */
function detectColorScheme(body) {
    if (window.matchMedia) {
        // Check if the dark-mode Media-Query matches
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
          // Prefers Dark Mode
          body.classList.remove("lightMode"); // default mode
          body.classList.add("darkMode");
        }
      }
}


// Run Load Function on Content Load
document.addEventListener("DOMContentLoaded", load)
