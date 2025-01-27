# Dark Mode Toggle (Per-Site)

A simple, lightweight Chrome extension that allows you to toggle Dark Mode on a **per-website** basis. It uses a reduced-contrast dark theme for more comfortable reading and saves your preference for each domain, so you won’t have to re-toggle on return visits.

## Features

- **Per-Site Preferences**: Stores a dark mode setting for each domain.
- **Reduced Contrast**: Not pure black/white, reducing eye strain.
- **Simple, Sleek UI**: A single modern toggle button in the popup.
- **Lightweight**: Straightforward HTML/CSS/JS with no external libraries.

## File Structure

```
my-dark-mode-extension/
├─ manifest.json
├─ popup.html
├─ popup.js
├─ content.js
└─ README.md
```

## Requirements

- **Google Chrome** (Version supporting Manifest V3).
- No additional build tools are required—this extension is plain JavaScript, HTML, and CSS.

## Installation (Unpacked)

1. **Clone or download** this repository to your local machine.
2. Go to `chrome://extensions` in your Chrome browser.
3. **Enable Developer Mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the folder containing all extension files (where `manifest.json` resides).
5. The extension will appear in the toolbar.  
   - If it’s hidden, click the **Extensions** icon (puzzle piece), and pin it.

## Usage

1. Navigate to any website in Chrome.
2. Click on the **Dark Mode Toggle** extension icon.
3. In the popup, click the **“Switch to Dark/Light Mode”** button.
   - The preference is saved for the current domain.
4. Refresh the page or reopen the browser—Dark Mode will remain the same for that domain unless you toggle it again.



## License

This project is licensed under the [MIT License](LICENSE). You are free to modify, distribute, and use the code under the terms of that license.

