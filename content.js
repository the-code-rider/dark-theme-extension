// content.js

function getCurrentDomain() {
  return window.location.hostname; // e.g. "www.example.com"
}

// Create a <style> element for dark mode with reduced contrast
const darkModeStyle = `
  html, body {
    background-color: #222 !important;
    color: #ddd !important;
  }

  /* Apply a slight neutral background for other elements */
  * {
    background: transparent !important;
    color: inherit !important;
  }

  /* Optionally, you might try a subtle filter or partial invert on images,
     but let's just leave them normal to avoid weird color issues */
`;

let darkModeStyleElement = document.createElement("style");
darkModeStyleElement.id = "dark-mode-toggle-style";
darkModeStyleElement.textContent = darkModeStyle;

// Functions to attach/remove the style element
function enableDarkMode() {
  if (!document.getElementById("dark-mode-toggle-style")) {
    document.head.appendChild(darkModeStyleElement);
  }
}

function disableDarkMode() {
  let existingStyle = document.getElementById("dark-mode-toggle-style");
  if (existingStyle) {
    existingStyle.remove();
  }
}

// Check the stored preference for this domain on load
const domain = getCurrentDomain();
chrome.storage.local.get(["darkModePrefs"], (res) => {
  const prefs = res.darkModePrefs || {};
  const isDarkEnabled = prefs[domain];
  if (isDarkEnabled) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "enableDarkMode") {
    enableDarkMode();
    sendResponse({ status: "Dark mode enabled (this site)" });
  } else if (request.action === "disableDarkMode") {
    disableDarkMode();
    sendResponse({ status: "Dark mode disabled (this site)" });
  }
});
