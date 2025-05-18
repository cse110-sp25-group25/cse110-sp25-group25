window.addEventListener('DOMContentLoaded', init);

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

document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.restaurant-card');
  const leftReviews = document.querySelector('.reviews.left');
  const rightReviews = document.querySelector('.reviews.right');
  const leftHint = document.querySelector('.left-hint');
  const rightHint = document.querySelector('.right-hint');

  card.addEventListener('click', () => {
    card.classList.toggle('flipped');

    const isFlipped = card.classList.contains('flipped');
    
    // Fade in reviews
    leftReviews.classList.toggle('visible', isFlipped);
    rightReviews.classList.toggle('visible', isFlipped);

    // Hide hints when flipped
    if (leftHint && rightHint) {
      leftHint.style.display = isFlipped ? 'none' : 'flex';
      rightHint.style.display = isFlipped ? 'none' : 'flex';
    }
  });
});