// Get the modal
const modal = document.getElementById("modalContainer");
const modalImg = document.getElementById("selectedImgModal");
const captionText = document.getElementById("caption");

// Get all images with class "project-img"
let images = document.querySelectorAll(".project-img");

// Loop through images to add click event
images.forEach(img => {
    img.onclick = function () {
        modal.style.display = "flex";
        // Load high-res image from data attribute
        let highUrlSrc = this.getAttribute("data-url");
        if (highUrlSrc) {
            modalImg.src = highUrlSrc;
            modalImg.loading = "lazy"; // Lazy load the iframe
        } else {
            modalImg.src = this.src; // Fallback if no iframe link version exists
        }
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

