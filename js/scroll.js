window.addEventListener("scroll", function () {
    const arrowContainer = document.getElementById("arrowContainer");
    
    if (!arrowContainer) return; // Safety check
    
    if (window.scrollY > 50) {
        arrowContainer.style.opacity = "0";
    } else {
        arrowContainer.style.opacity = "1";
    }
});
