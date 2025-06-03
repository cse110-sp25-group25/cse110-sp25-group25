window.addEventListener('DOMContentLoaded', init);

function init() {
    // responsive navbar on mobile
    setupDropDown();
}

/**
 * Sets up responsive navbar on mobile
 */
function setupDropDown() {
    const dropDown = document.querySelector(".burger-icon");
    const navLinks = document.querySelectorAll("nav a")
    dropDown.addEventListener("click", function () {
        navLinks.forEach(function (link) {
            if (link.style.display != "block") {
                link.style.display = "block";
            }
            else {
                link.style.display = "none";
            }
        });
    })
}