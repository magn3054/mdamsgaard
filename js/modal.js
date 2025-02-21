// Get the modal
const modal = document.getElementById("modalContainer");
const modalImg = document.getElementById("selectedImgModal");
const captionText = document.getElementById("caption");

// Get all images with class "project-img"s
let images = document.querySelectorAll(".project-img");
let imageTitle = document.querySelectorAll(".card-titles");

// Function to open modal from image or title
function openModalFromElement(element) {
    const card = element.closest('.project-card');
    const img = card.querySelector('.project-img');
    if (img) {
        modal.style.display = "flex";
        // Load high-res image from data attribute
        let highUrlSrc = img.getAttribute("data-url");
        if (highUrlSrc) {
            modalImg.src = highUrlSrc;
            modalImg.loading = "lazy"; // Lazy load the iframe
        } else {
            modalImg.src = img.src; // Fallback if no iframe link version exists
        }
    }
}

// Check screen size before adding event listeners
if (window.innerWidth >= 600) {
    // Loop through images to add click event
    images.forEach(img => {
        img.onclick = function () {
            openModalFromElement(this);
        };
    });

    // Loop through card-title (h3) to add click event
    imageTitle.forEach(title => {
        title.onclick = function () {
            openModalFromElement(this);
        };
    });

    // Close modal when clicking on close button
    document.querySelector(".close").onclick = function () {
        modal.style.display = "none";
    };

    // Close modal when clicking outside the image
    modal.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Close modal with Esc key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            modal.style.display = "none";
        }
    });
}
