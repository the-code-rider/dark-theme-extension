// popup.js

// Helper: get the domain from a URL
function getDomainFromUrl(url) {
  try {
    // e.g. https://www.example.com/page => "www.example.com"
    let hostname = new URL(url).hostname;
    return hostname;
  } catch (e) {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const toggleBtn = document.getElementById("toggleBtn");
  
  // 1. Get the current active tab
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentDomain = getDomainFromUrl(tab.url);

  if (!currentDomain) {
    toggleBtn.textContent = "Error";
    toggleBtn.disabled = true;
    return;
  }

  // 2. Fetch stored preferences for all domains
  chrome.storage.local.get(["darkModePrefs"], (res) => {
    const prefs = res.darkModePrefs || {};

    // Current preference for this domain
    const isDarkEnabled = !!prefs[currentDomain];

    // Update button text
    toggleBtn.textContent = isDarkEnabled
      ? "Switch to Light Mode"
      : "Switch to Dark Mode";

    // 3. Handle button click to toggle
    toggleBtn.addEventListener("click", () => {
      // Toggle the preference
      const newValue = !isDarkEnabled;
      prefs[currentDomain] = newValue;

      // Save updated prefs back to storage
      chrome.storage.local.set({ darkModePrefs: prefs }, () => {
        // Update button text
        toggleBtn.textContent = newValue
          ? "Switch to Light Mode"
          : "Switch to Dark Mode";

        // 4. Send message to content script
        chrome.tabs.sendMessage(tab.id, {
          action: newValue ? "enableDarkMode" : "disableDarkMode"
        });
      });
    });
  });
});
