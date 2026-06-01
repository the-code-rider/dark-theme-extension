// content.js

function getCurrentDomain() {
  return window.location.hostname; // e.g. "www.example.com"
}

// Create a <style> element for dark mode that preserves page contrast.
const darkModeStyle = `
  html.dark-mode-toggle-enabled {
    background: #fff !important;
    color-scheme: light !important;
    filter: invert(1) hue-rotate(180deg) !important;
  }

  html.dark-mode-toggle-enabled body {
    background: #fff !important;
  }

  html.dark-mode-toggle-enabled img,
  html.dark-mode-toggle-enabled picture,
  html.dark-mode-toggle-enabled video,
  html.dark-mode-toggle-enabled canvas,
  html.dark-mode-toggle-enabled iframe,
  html.dark-mode-toggle-enabled embed,
  html.dark-mode-toggle-enabled object,
  html.dark-mode-toggle-enabled [style*="background-image"] {
    filter: invert(1) hue-rotate(180deg) !important;
  }
`;

let darkModeStyleElement = document.createElement("style");
darkModeStyleElement.id = "dark-mode-toggle-style";
darkModeStyleElement.textContent = darkModeStyle;

// Functions to attach/remove the style element
function enableDarkMode() {
  if (!document.getElementById("dark-mode-toggle-style")) {
    const styleParent = document.head || document.documentElement;
    styleParent.appendChild(darkModeStyleElement);
  }
  document.documentElement.classList.add("dark-mode-toggle-enabled");
}

function disableDarkMode() {
  document.documentElement.classList.remove("dark-mode-toggle-enabled");

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
