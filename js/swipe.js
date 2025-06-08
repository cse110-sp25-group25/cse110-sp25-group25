// import {applyFilters, removeViewed} from './swipe.utils.js'


// This script handles the swipe functionality for restaurant cards, including filtering, flipping, and saving to a deck.
document.addEventListener('DOMContentLoaded', async () => {
  const clearBtn = document.getElementById('clear-filters-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem('userSelections');
      window.location.reload();
  });
  }
  
  const res = await fetch('data/restaurants.json');
  let data = await res.json();
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
    checkIfAllSwiped();
    return;
}
data = shuffleArray(data);
renderRestaurant(data);
setupButtons(data);
});

/**
 * Shuffles the elements of an array in place.
 * @param {Array} array The array to be shuffled.
 * @returns {Array} The shuffled array.
 */

function shuffleArray(array) {
  for (let i = array.length -1; i> 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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
          <p>
            <img src="assets/location-icon.png" alt="Location" class="icon-img">
            <a href="#">${r.location}</a>
          </p>
          <p>
            <img src="assets/time-icon.png" alt="Hours" class="icon-img">
            ${r.hours}
          </p>
          <p>
            <img src="assets/phone-icon.png" alt="Phone" class="icon-img">
            ${r.phone}
          </p>
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
* Resets the state of a card and hides its reviews.
* @param {number|string} cardId - The card's unique identifier.
*/
function resetCard(cardId) {
const card = document.getElementById(`card_${cardId}`);
const leftRev = document.getElementById(`left_review_${cardId}`);
const rightRev = document.getElementById(`right_review_${cardId}`);
if (!card) return;

card.classList.remove('flipped');
[leftRev, rightRev].forEach(el => {
    if (el) {
        el.style.opacity = 0;
        el.style.display = 'none';
    }
});
}

/**
* Sets up accept/reject button logic and swiping transitions.
*/
function setupButtons(data) {
let swipedCount   = 0;
const totalCards  = data.length;

const declineBtn = document.querySelector('button[title="Reject"]');
const acceptBtn = document.querySelector('button[title="Accept"]');

declineBtn.addEventListener("click", () => {
    const current = document.querySelector('.active-card');
    resetCard(current.id.split('_')[1]);
    current.classList.add('swipe-left');

    setTimeout(() => {
        current.style.display = 'none';
        current.classList.remove('swipe-left', 'active-card');

        const newId = Number(current.id.split('_')[1]) + 1;
        swipedCount += 1;

        const newCard = document.getElementById(`card_${newId}`);
        if (newCard) {
            newCard.style.display = 'block';
            newCard.classList.add('active-card');
        }
        if (swipedCount == totalCards) {
          checkIfAllSwiped();
        }
    }, 500);

    handleViewedCard(+current.getAttribute('data-id'));
});

acceptBtn.addEventListener("click", () => {
    const current = document.querySelector('.active-card');
    resetCard(current.id.split('_')[1]);
    current.classList.add('swipe-right');

    setTimeout(() => {
        current.style.display = 'none';
        current.classList.remove('swipe-right', 'active-card');

        const newId = Number(current.id.split('_')[1]) + 1;
        swipedCount += 1;

        const newCard = document.getElementById(`card_${newId}`);
        if (newCard) {
            newCard.style.display = 'block';
            newCard.classList.add('active-card');
        }
        if (swipedCount == totalCards){
          checkIfAllSwiped();
        }
    }, 500);

    const dataId = +current.getAttribute('data-id');
    saveToDeck(dataId);
    handleViewedCard(dataId);
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


/**
 * Hides the swipe card interface and displays the end screen when all cards have been swiped.
 * 
 * This function performs the following steps:
 * 1. Hides the card container and swipe buttons.
 * 2. Shows the end screen along with “View Rejected” and “Full Reset” buttons.
 * 3. Disables the “View Rejected” button if there are no rejected cards.
 * 4. Attaches click handlers:
 *    - “View Rejected” button: Renders only the cards that were swiped left (rejected), 
 *      then re-displays the swipe interface for those cards.
 *    - “Full Reset” button: Clears all viewed card state, resets the deck to its full set,
 *      and re-displays the swipe interface for all restaurants.
 *
 * @function
 * @returns {void}
 */ 
function checkIfAllSwiped() {
    const endScreen = document.getElementById("end-screen");
    const cardContainer = document.getElementById("card-container");
    // const resetButton = document.querySelector('.button-type3');
    const swipeButtons = document.querySelector('.swipe-buttons');

    // hide cardContainer
    cardContainer.style.display = "none";
    // hide swipe buttons
    swipeButtons.style.display = "none";
    // display end screen
    endScreen.style.display = "block";

    // get the new buttons
    const viewRejectedBtn = document.getElementById("view-rejected-btn");
    const fullResetBtn    = document.getElementById("full-reset-btn");
    
    // make them appear
    viewRejectedBtn.style.display = "block";
    fullResetBtn.style.display = "block";

    if (getRejectedData().length == 0) {
      viewRejectedBtn.style.display = "none";
    }

    // —— Button #1: View rejected cards ——
    viewRejectedBtn.onclick = () => {
      // 1) Compute only those restaurants the user swiped left on
      const rejectedData = getRejectedData();
      if (rejectedData.length === 0) {
        
        return;
      }

      endScreen.style.display = "none"; // hide endscreen
      swipeButtons.style.display = "flex"; // display swipe buttons
      cardContainer.style.display = "flex"; // display cards
      
      // only render rejected resturant cards
      renderRestaurant(rejectedData);
      setupButtons(rejectedData);
    };

    // —— Button #2: Fully reset “viewed” ——
    fullResetBtn.onclick = () => {
      // 1) Clear all viewed‐IDs (so nothing is considered “seen”)
      const allRestaurantData = clearAllViewedAndReturnData();

      // 2) Hide the end screen and re‐show the swipe buttons
      endScreen.style.display = "none";
      swipeButtons.style.display = "flex";
      cardContainer.style.display = "flex"; // display cards

      // 3) Render the entire deck (freshData). 
      renderRestaurant(allRestaurantData);
      setupButtons(allRestaurantData);
    };
}


/**
 * Return an array of restaurant objects that were "rejected":
 * those with ID ∈ viewed[] but not ∈ deck[].
 */
function getRejectedData() {
  const viewed = JSON.parse(localStorage.getItem('viewed')) || [];
  
  // read the saved deck 
  const deck = JSON.parse(localStorage.getItem('deck')) || [];

  // build set of rejected cards
  const acceptedIds = new Set(deck.map(r => r.id));
  const rejectedIds = viewed.filter(id => !acceptedIds.has(id));

  const allRestaurants = JSON.parse(localStorage.getItem('restaurantData')) || [];
  return allRestaurants.filter(r => rejectedIds.includes(r.id));
}

/**
 * Clears the 'viewed' list entirely, then returns all restaurants
 * (so the caller can re-render the full deck).
 */
function clearAllViewedAndReturnData() {
  localStorage.removeItem('viewed');
  localStorage.removeItem('deck');
  return JSON.parse(localStorage.getItem('restaurantData')) || [];
}