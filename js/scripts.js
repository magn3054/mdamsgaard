document.addEventListener("DOMContentLoaded", () => {
    const langSwitcher = document.getElementById("langSwitcher");
    const arrowContainer = document.getElementById("arrowContainer");
    const langText = document.getElementById("langText");
    const Name = document.getElementById("name");
    const subtitleElement = document.getElementById("heroSubtitle");
    let words = []; // Store the words dynamically from JSON
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

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

    // Detect browser language and load the corresponding content
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


    // Function to update the page content with the selected language
    async function updateLanguage(lang) {
        if (!lang) {
            console.log("Invalid language:", lang, "Defaulting to Danish");
            lang = "da";
        }

        document.documentElement.lang = lang;
        localStorage.setItem("preferredLang", lang);

        const languageData = await loadLanguageData(lang);

        // Update elements based on data-key attributes
        document.querySelectorAll("[data-key]").forEach(element => {
            const key = element.getAttribute("data-key");
            if (languageData[key]) {
                element.textContent = languageData[key];
            }
        });

        // Update dynamic words for typewriter effect
        words = [];
        let index = 1;
        while (languageData[`heroSubtitle${index}`]) {
            words.push(languageData[`heroSubtitle${index}`]);
            index++;
        }

        if (words.length > 0) {
            startTypewriter();
        }

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

    // Typewriter Effect Function
    function startTypewriter() {
        wordIndex = 0;
        letterIndex = 0;
        isDeleting = false;
        typeEffect();
    }

    function typeEffect() {
        if (words.length === 0) return;
    
        const currentWord = words[wordIndex];
        const currentText = currentWord.substring(0, letterIndex);
    
        subtitleElement.textContent = currentText;
    
        if (!isDeleting) {
            if (letterIndex < currentWord.length) {
                letterIndex++;
                setTimeout(typeEffect, 100); // Konstant hastighed
            } else {
                isDeleting = true;
                setTimeout(typeEffect, 2000); // 2 sekunders pause før sletning
            }
        } else {
            if (letterIndex > 0) {
                letterIndex--;
                setTimeout(typeEffect, 50); // Konstant hastighed ved sletning
            } else {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeEffect, 500); // 500 ms pause før næste ord
            }
        }
    }

    // Dropdown event listener
    if (langSwitcher) {
        langSwitcher.addEventListener("click", () => {
            document.getElementById("langMenu").classList.toggle("show");
        });

        document.querySelectorAll("#langMenu li").forEach(item => {
            item.addEventListener("click", () => {
                const selectedLang = item.getAttribute("data-lang");
                console.log('Selected language:', selectedLang);

                updateLanguage(selectedLang);
                document.getElementById("langMenu").classList.remove("show");
            });
        });

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

    // LangText disappears on scrolls
    window.addEventListener("scroll", () => {
        if (langText) {
            langText.style.opacity = window.scrollY > 50 ? "0" : "1";
        }
    });

    // name increase blur on scroll
    window.addEventListener("scroll", () => {
        if (Name) {
            const initialBlur = 10;
            const blurValue = Math.min(initialBlur + window.scrollY / 150, 100);
            Name.style.filter = `blur(${blurValue}px)`;
        }
    });














    // Intersection Observer to show hidden elements
    const hiddenElements = document.querySelectorAll(".hidden");
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    hiddenElements.forEach(element => observer.observe(element));
});











// lightsOut version
document.addEventListener('mousemove', (e) => {
    const style = document.documentElement.style;
    style.setProperty('--x', `${e.clientX}px`);
    style.setProperty('--y', `${e.clientY}px`);
});

const bulb = document.getElementById("bulb");
const lightsOut = document.getElementById("lightsOut");
const flashlight = document.getElementById("flashlight");

let isOn = false;

function toggleFlashlight() {
    isOn = !isOn; // Toggle state

    if (isOn) {
        bulb.style.backgroundImage = "url('../img/lightbulb.svg')"; // Change image to lit bulb
        bulb.classList.add("glow");
        lightsOut.classList.add("lights-out");
        flashlight.style.opacity = "1"; // Show flashlight
    } else {
        bulb.style.backgroundImage = "url('../img/bulb.svg')"; // Change image to off bulb
        bulb.classList.remove("glow");
        lightsOut.classList.remove("lights-out");
        flashlight.style.opacity = "0"; // Hide flashlight
    }
}

// Event listener for clicking the bulb to toggle flashlight
bulb.addEventListener("click", toggleFlashlight);

// Event listener for pressing the 'Esc' key to turn off the flashlight
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOn) { // Only turn off if the flashlight is on
        toggleFlashlight(); // Turn off flashlight
    }
});


document.addEventListener("mousemove", (e) => {
    const style = document.documentElement.style;
    style.setProperty("--flashlight-x", `${e.clientX}px`);
    style.setProperty("--flashlight-y", `${e.clientY}px`);
});