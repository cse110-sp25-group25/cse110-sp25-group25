// import {applyFilters, removeViewed} from './swipe.utils.js'


// This script handles the swipe functionality for restaurant cards, including filtering, flipping, and saving to a deck.
document.addEventListener('DOMContentLoaded', async () => {
  const clearBtn = document.getElementById('clear-filters-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem('userSelections');
      alert('All filters have been cleared. To set new ones, go back to the filters page.');
      window.location.reload();

  });
  }
  let data = JSON.parse(localStorage.getItem('restaurantData'));
  if (!data) {
      const res = await fetch('data/restaurants.json');
      data = await res.json();
      localStorage.setItem('restaurantData', JSON.stringify(data));
  }

  const filters = JSON.parse(localStorage.getItem('userSelections'));
  if (filters) {
      data = applyFilters(data, filters);
  }

  const viewed = JSON.parse(localStorage.getItem('viewed'));
  if (viewed) {
      data = removeViewed(data, viewed);
  }

  if (!data || data.length === 0) {
      console.warn("no data, can't render");
      return;
  }

    setupButtons(data);
    renderRestaurant(data);
});

/**
* A function to remove the subset of data that doesn't satisfy the desired filters
* @param {Array} data original list of data
* @param {Array} filters list of filters to apply
* @returns the subset of data that satisfies the desired filters
*/
function applyFilters(data, filters) {
  return data.filter(r => {
      if (filters.cuisine && filters.cuisine.length>0 && !filters.cuisine.includes(r.cuisine)){
          return false;
      } 
      if (filters.price && r.price.length > filters.price.length) return false;
      // Parse distance and rating
      if (filters.distance && r.distance > parseFloat(filters.distance)) return false;
      if (filters.rating && r.rating < parseFloat(filters.rating)) return false;

      return true;
});
}

/**
* A function that takes in a list of data, a list of viewed elements, and returns the subset of the original list
* that is not in the second.
* @param data original list
* @param viewed items to remove
* @returns the set difference data \ viewed
*/
function removeViewed(data, viewed) {
return data.filter(r => {
  return !viewed.includes(+r.id);
});
}

/**
* saves a restaurant to the deck in localStorage.
*  @param {number} id - The ID of the restaurant to save.
* @return {void}
* */
function saveToDeck(id) {
const all = JSON.parse(localStorage.getItem('restaurantData'));
const saved = JSON.parse(localStorage.getItem('deck')) || [];

const toAdd = all.find(r => r.id === id);
if(!toAdd) {
  return;
}

const exists = saved.some( r=> r.id === id);
if(!exists) {
    saved.push(toAdd);
    localStorage.setItem('deck', JSON.stringify(saved));
}
}

/**
* Creates a review container element.
* @param {Array<Object>} reviews - List of review objects with `text` and `author`.
* @param {string} side - Either 'left' or 'right', determines where it's shown.
* @param {number} id - Unique ID for the card/review container.
* @returns {HTMLDivElement} The review container element.
*/
function createReviewElement(reviews, side, id) {
const reviewDiv = document.createElement('div');
reviewDiv.classList.add('reviews', side);
reviewDiv.id = `${side}_review_${id}`;

let innerHTML = '';
for (let i = 0; i < reviews.length; i++) {
    innerHTML += `<p>"${reviews[i].text}"<br><span>- ${reviews[i].author}</span></p>`;
}

reviewDiv.innerHTML = innerHTML;
reviewDiv.style.display = 'none';

return reviewDiv;
}

/**
* Renders all restaurant cards and associated review elements.
* @param {Array<Object>} data - List of restaurant objects to render.
*/
function renderRestaurant(data) {
  const container = document.getElementById('card-container');
  const rightReviewContainer = document.getElementById('right-review-container');
  const leftReviewContainer = document.getElementById('left-review-container');
  container.innerHTML ='';

  let id = 0;
  data.forEach(r => {
  const div = document.createElement('div');
  div.classList.add('restaurant-card');

  div.innerHTML = `
    <div class="card-inner">
      <!-- Front -->
      <div class="card-front">
        <h2>${r.name}</h2>
        <img src="${r.image}" alt="${r.name}" class="card-img" />
        <div class="details">
          <span class="rating">
            <img src="assets/star-icon.png" alt="star" class="icon" />
            ${r.rating}
          </span>
          <span class="distance">
            <img src="assets/location-icon.png" alt="location" class="icon" />
            ${r.distance} mi
          </span>
        </div>
        <div class="tags">
          <span class="tag">${r.cuisine}</span>
          ${r.tags?.map(tag => `<span class="tag">${tag}</span>`).join('') || ''}
        </div>
      </div>

      <!-- Back -->
      <div class="card-back">                
        <div class="card-details">
          <h2>${r.name}</h2>
          <p>📍 <a href="#">${r.location}</a></p>
          <p>🕒 ${r.hours}</p>
          <p>📞 ${r.phone}</p>
          <div class="menu-images">
            ${(r.menuImages || []).map(src => `<img src="${src}" alt="food">`).join('')}
          </div>
          <a href="#" class="view-menu">View Menu ↗</a>
        </div>
      </div>
    </div>
  `;

  div.setAttribute('data-id', r.id);
  div.id = `card_${id}`;
  div.style.display = 'none';
  container.appendChild(div);

  const reviews = r.reviews || [];
  const leftReviews = reviews.slice(0, 3);
  const rightReviews = reviews.slice(3, 6);

  const leftReviewElement = createReviewElement(leftReviews, 'left', id);
  const rightReviewElement = createReviewElement(rightReviews, 'right', id);

  leftReviewContainer.appendChild(leftReviewElement);
  rightReviewContainer.appendChild(rightReviewElement);

  setupFlipping(div);
  id += 1;
  });

  const first = document.getElementById('card_0');
  if (first) {
    first.classList.add('active-card');
    first.style.display = 'block';
  }
}

function resetCard(cardId) {
    const card      = document.getElementById(`card_${cardId}`);
    const leftRev   = document.getElementById(`left_review_${cardId}`);
    const rightRev  = document.getElementById(`right_review_${cardId}`);
    if (!card) return;
    // 1. force-unflip
    card.classList.remove('flipped');
    // 2. instantly hide review panes
    [leftRev, rightRev].forEach(el => {
      if (el) {
        el.style.opacity = 0;
        el.style.display = 'none';
      }
    });
  
    const leftHint  = document.querySelector('.left-hint');
    const rightHint = document.querySelector('.right-hint');
    if (leftHint && rightHint) {
      leftHint.style.display  = 'flex';
      rightHint.style.display = 'flex';
    }
  }


function setupButtons(data) {
    console.log("setting up buttons");
    let swipedCount   = 0;
    const totalCards  = data.length;

    const resetButton = document.querySelector('.button-type3');
    resetButton.style.display = "none";

    let declineBtn = document.querySelector('button[title="Reject"]');
    declineBtn.addEventListener("click", () => {
        let current = document.querySelector('.active-card');
        resetCard(current.id.split('_')[1]);
        current.classList.add('swipe-left');

        setTimeout(() => {
            current.style.display = 'none';
            current.classList.remove('swipe-left');
            current.classList.remove('active-card');

            let newId = Number(current.id.split('_')[1]) + 1;
            swipedCount += 1;
            
            let newChild = document.getElementById(`card_${newId}`)
            if (newChild){
                newChild.style.display = 'block';
                newChild.classList.add('active-card');
            }
            if (swipedCount == totalCards) {
                checkIfAllSwiped(data);
            }
        }, 500);

        //make sure this card never shows up again (even on reload)
        let dataId = +current.getAttribute('data-id')
        handleViewedCard(dataId);
    });

    let acceptBtn = document.querySelector('button[title="Accept"]');
    acceptBtn.addEventListener("click", () => {
        let current = document.querySelector('.active-card');
        resetCard(current.id.split('_')[1]);
        current.classList.add('swipe-right');

        setTimeout(() => {
            current.style.display = 'none';
            current.classList.remove('swipe-right');
            current.classList.remove('active-card')

            let newId = Number(current.id.split('_')[1]) + 1;
            swipedCount += 1;

            let newChild = document.getElementById(`card_${newId}`)
            if (newChild){
                newChild.style.display = 'block';
                newChild.classList.add('active-card');
            }
            if (swipedCount == totalCards){
                checkIfAllSwiped(data);
            }
        }, 500);
        // save card to collection (localstorage)
        let dataId = +current.getAttribute('data-id')
        saveToDeck(dataId);
        // make sure this card never shows up again (even on reload)
        handleViewedCard(dataId);
    });
}

/**
* Sets up flipping interaction on a card to toggle between front and back.
* @param {HTMLElement} card - The card element to attach flipping logic to.
*/
function setupFlipping(card) {
// const card = document.querySelector('.active-card');
const cardId = card.id.split('_')[1];
const leftReviews = document.getElementById(`left_review_${cardId}`);
const rightReviews = document.getElementById(`right_review_${cardId}`);
const leftHint = document.querySelector('.left-hint');
const rightHint = document.querySelector('.right-hint');

leftReviews.style.display = 'none';
leftReviews.style.opacity = 0;
rightReviews.style.display = 'none';
rightReviews.style.opacity = 0;

card.addEventListener('click', () => {
    card.classList.toggle('flipped');
    const isFlipped = card.classList.contains('flipped');

    if (isFlipped) {
      // Fade in reviews
        leftReviews.style.display = 'flex';
        rightReviews.style.display = 'flex';

        if (leftHint) leftHint.style.display = 'none';
        if (rightHint) rightHint.style.display = 'none';

        setTimeout(() => {
            leftReviews.style.opacity = 1;
            rightReviews.style.opacity = 1;
        }, 300);
    } else {
        leftReviews.style.opacity = 0;
        rightReviews.style.opacity = 0;

        setTimeout(() => {
            leftReviews.style.display = 'none';
            rightReviews.style.display = 'none';

            if (leftHint && rightHint) {
              leftHint.style.display = 'flex';
              rightHint.style.display = 'flex';
          }
        }, 300);
    }
});
}

/**
* Saves a restaurant ID to the list of viewed restaurants in localStorage.
* @param {number} id - The ID of the viewed restaurant.
*/
function handleViewedCard(id) {
  // simply save this id to local storage. this will just be reapplied as a filter
  const viewed = JSON.parse(localStorage.getItem('viewed')) || [];

  const exists = viewed.some( r=> r === id);
  if(!exists) {
    viewed.push(id);
    localStorage.setItem('viewed', JSON.stringify(viewed));
  }
}

 function checkIfAllSwiped(data) {
    const endScreen = document.getElementById("end-screen");
    const cardContainer = document.getElementById("card-container");
    const resetButton = document.querySelector('.button-type3');

    // hide cardContainer
    cardContainer.style.display = "none";

    // display end screen
    endScreen.style.display = "block";

    // show reset button
    resetButton.style.display = "block";


    // hide other two buttons
    const buttons = document.querySelector('.swipe-buttons');
    buttons.style.display = "none";


    /* reset button functionality */
    resetButton.addEventListener("click", () => {
      // hide end screen
      endScreen.style.display = "none";

      // display buttons and card container
      const buttons = document.querySelector('.swipe-buttons');
      buttons.style.display = "flex";
      cardContainer.style.display = "flex";

      renderRestaurant(data);
      setupButtons(data);
    });
}