"use strict";

const toggleMobileCheckbox = document.getElementById('mobile-toggle'); // Get the mobile checkbox input
const toggleDesktopCheckbox = document.getElementById('desktop-toggle'); // Get the desktop checkbox input
const logo = document.getElementById('logo'); // Get the logo element
const settings = document.getElementById('settings'); // Get the settings element
const currentTheme = localStorage.getItem('theme');

// Function to update the logo based on the theme
function updateSVG(theme) {
    if (theme === 'dark') {
        logo.src = 'img/md_logo_dark.svg';
        settings.src = 'img/settings_dark.svg';
    } else {
        logo.src = 'img/md_logo_light.svg';
        settings.src = 'img/settings_light.svg';
    }
}

// Function to apply a theme
function applyTheme(theme) {
    document.documentElement.setAttribute('theme', theme);
    localStorage.setItem('theme', theme); // Save the theme to localStorage
    updateSVG(theme);

    // Sync both checkboxes to the same theme state
    const isDarkTheme = theme === 'dark';
    toggleMobileCheckbox.checked = isDarkTheme;
    toggleDesktopCheckbox.checked = isDarkTheme;
}

// Apply the saved theme on load
if (currentTheme) {
    applyTheme(currentTheme); // Set theme based on saved state
} else {
    applyTheme('light'); // Default to light theme
}

// Add a single event listener for both checkboxes
function toggleTheme(event) {
    const theme = event.target.checked ? 'dark' : 'light'; // Determine the theme based on the checkbox that triggered the event
    applyTheme(theme); // Apply the chosen theme and sync both switches
}

// Attach the event listeners for both switches
toggleMobileCheckbox.addEventListener('change', toggleTheme);
toggleDesktopCheckbox.addEventListener('change', toggleTheme);
