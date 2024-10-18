"use strict";

const toggleCheckbox = document.querySelector('#theme-toggle'); // Get the checkbox input
const logo = document.getElementById('logo'); // Get the logo element
const currentTheme = localStorage.getItem('theme');

// Function to update the logo based on the theme
function updateLogo(theme) {
    if (theme === 'dark') {
        logo.src = 'img/md_logo_dark.svg';
    } else {
        logo.src = 'img/md_logo_light.svg';
    }
}

// Apply the saved theme on load
if (currentTheme) {
    document.documentElement.setAttribute('theme', currentTheme);
    // Set the checkbox state based on the saved theme
    toggleCheckbox.checked = currentTheme === 'dark';
    // Update the logo based on the current theme
    updateLogo(currentTheme);
} else {
    // If no theme is saved, default to 'light' theme
    document.documentElement.setAttribute('theme', 'light');
    // Set the default logo for light theme
    updateLogo('light');
}

// Toggle between light and dark modes based on checkbox state
toggleCheckbox.addEventListener('change', () => {
    const theme = toggleCheckbox.checked ? 'dark' : 'light';

    // Apply the new theme
    document.documentElement.setAttribute('theme', theme);
    localStorage.setItem('theme', theme); // Save the preference in localStorage

    // Update the logo based on the new theme
    updateLogo(theme);
});
