// Get the modal
var modal = document.getElementById("modalContainer");
var modalImg = document.getElementById("selectedImgModal");
var captionText = document.getElementById("caption");

// Get all images with class "project-img"
var images = document.querySelectorAll(".project-img");

// Loop through images to add click event
images.forEach(img => {
    img.onclick = function () {
        modal.style.display = "flex";
        // Load high-res image from data attribute
        var highUrlSrc = this.getAttribute("data-url");
        if (highUrlSrc) {
            modalImg.src = highUrlSrc;
            modalImg.loading = "lazy"; // Lazy load the image
        } else {
            modalImg.src = this.src; // Fallback if no high-res version exists
        }

        // captionText.innerHTML = this.alt;
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