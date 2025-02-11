document.addEventListener("DOMContentLoaded", () => {
    const langSwitcher = document.getElementById("langSwitcher");
    const arrowContainer = document.getElementById("arrowContainer");

    // Function to fetch JSON data based on the selected language
    async function loadLanguageData(lang) {
        try {
            const response = await fetch(`/languages/${lang}.json`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error loading language data:', error);
            return {};
        }
    }

    // Function to update the page content with the selected language
    async function updateLanguage(lang) {
        // Ensure lang is not null or undefined
        if (!lang) {
            console.log("Invalid language:", lang, "Defaulting to Danish");
            lang = "da"; // Default to Danish if lang is null or invalid
        }

        document.documentElement.lang = lang;
        localStorage.setItem("preferredLang", lang);

        // Fetch language data from the JSON file
        const languageData = await loadLanguageData(lang);

        // Update elements based on data-key attributes
        document.querySelectorAll("[data-key]").forEach(element => {
            const key = element.getAttribute("data-key");
            if (languageData[key]) {
                element.textContent = languageData[key];
            }
        });

        // Update dropdown button text and icon
        if (langSwitcher) {
            const langMap = {
                da: '<img class="lang-icon" src="img/icon-lang_dk.svg" alt="Danish Flag"/>',
                en: '<img class="lang-icon" src="img/icon-lang_en.svg" alt="UK Flag"/>',
                es: '<img class="lang-icon" src="img/icon-lang_es.svg" alt="Spanish Flag"/>',
                pt: '<img class="lang-icon" src="img/icon-lang_pt.svg" alt="Portuguese Flag"/>'
            };
            langSwitcher.innerHTML = langMap[lang] || '<img class="lang-icon" src="img/icon-lang_dk.svg" alt="">';
        }
    }

    // Function to detect browser language
    function getBrowserLanguage() {
        const countryCode = navigator.language || navigator.userLanguage;
        if (countryCode.startsWith("da")) return "da";
        if (countryCode.startsWith("en")) return "en";
        if (countryCode.startsWith("es")) return "es";
        if (countryCode.startsWith("pt")) return "pt";
        return "da"; // Default to Danish
    }

    // Load preferred or detected language
    const savedLang = localStorage.getItem("preferredLang") || getBrowserLanguage();
    console.log('Using language:', savedLang);
    updateLanguage(savedLang);

    // Dropdown event listener
    if (langSwitcher) {
        langSwitcher.addEventListener("click", () => {
            document.getElementById("langMenu").classList.toggle("show");
        });

        // Listen for clicks on the language menu items
        document.querySelectorAll("#langMenu li").forEach(item => {
            item.addEventListener("click", () => {
                const selectedLang = item.getAttribute("data-lang");
                console.log('Selected language:', selectedLang);

                updateLanguage(selectedLang); // Update language based on the selected option
                document.getElementById("langMenu").classList.remove("show"); // Close the menu after selection
            });
        });

        // Close dropdown if clicking outside
        document.addEventListener("click", (e) => {
            if (!langSwitcher.contains(e.target) && !document.getElementById("langMenu").contains(e.target)) {
                document.getElementById("langMenu").classList.remove("show");
            }
        });
    }

    // Arrow disappears on scroll
    window.addEventListener("scroll", () => {
        if (arrowContainer) {
            arrowContainer.style.opacity = window.scrollY > 50 ? "0" : "1";
        }
    });
});
