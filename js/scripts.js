window.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', () => {
  const deckSection = document.getElementById('deck-section');
  if (deckSection && !window.location.pathname.includes('collection.html')) {
    deckSection.style.display = 'none';
  }
});




function init() {
    // responsive navbar on mobile
    setupDropDown();
}

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

