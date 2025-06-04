
window.addEventListener('DOMContentLoaded', init);

const MOBILE_HIDER = document.createElement('style');
MOBILE_HIDER.innerHTML = `.hidden { display: none !important; }`;
document.head.appendChild(MOBILE_HIDER);

function init() {

    const deckList = document.querySelector(".deck-list");
    const clearBtn = document.querySelector('.clear-deck-btn');
    const cuisineFilter = document.getElementById('cuisine-filter');
    const ratingsFilter = document.getElementById('ratings-filter');
    const distanceFilter = document.getElementById('distance-filter');
    const savedRestaurants = JSON.parse(localStorage.getItem('deck')) || [];

    // back button for mobile view
    const backBtnContainer = document.getElementById("back-button-container");
    backBtnContainer.classList.add('hidden');
    
    // left view card div
    const deckBody = document.getElementById('left-body');

    const isMobile = window.matchMedia("(max-width: 600px)").matches;
    if (isMobile) {
      deckBody.classList.add('hidden');
    }

    // render resturant cards if they exist
    if(savedRestaurants.length === 0) {
        renderDeck([], deckList);
    } else{
        buildCuisineFilter(savedRestaurants, cuisineFilter); // populate filter
    }

    // make the clear button functionality
    clearBtn.addEventListener('click', () => {
        localStorage.removeItem('deck');
        localStorage.removeItem('viewed');
        renderDeck([], deckList);
    });

    const filters = {
        cuisine: 'all',
        ratingMax: 'all',
        distanceMax: 'all'
    };

    cuisineFilter.addEventListener('change', ({ target }) => {
        filters.cuisine = target.value.toLowerCase();
        applyFilters(filters, savedRestaurants, deckList);
    });

    ratingsFilter.addEventListener('change', ({ target }) => {
        filters.ratingMax = target.value;   // leave as string, parse in applyFilters
        applyFilters(filters, savedRestaurants, deckList);
    });

    distanceFilter.addEventListener('change', ({ target }) => {
        filters.distanceMax = target.value;
        applyFilters(filters, savedRestaurants, deckList);
    });

    applyFilters(filters, savedRestaurants, deckList);


    // functionality when clicking on left view card on screen
    deckBody.addEventListener('click', () => {
      if (deckBody.dataset.side == "back") {
        // show the frontside of the card
        handleCardClick(deckBody._r);
        return;
      }
      if (deckBody.dataset.side == "front"){
        // show the backside of the card
        deckBody.dataset.side = "back";
        deckBody.innerHTML=`
            <div class="collection-card-back">                
                <div class="card-details">
                  <h2>${deckBody.dataset.name}</h2>
                    <p>📍 <a href="#">${deckBody.dataset.address}</a></p>
                    <p>🕒 Hours ${deckBody.dataset.hours} PM</p>
                    <p>📞 ${deckBody.dataset.phone_number}</p>
                    <div class="menu-images">
                      <img src=${deckBody.dataset.photo1src} alt="food">
                      <img src=${deckBody.dataset.photo2src} alt="food">
                      <img src=${deckBody.dataset.photo3src} alt="food">
                    </div>
                    <a class="link" href="${deckBody.dataset.website}" target="_blank" rel="noopener noreferrer">View Menu ↗</a>
                </div>
            </div>`;
      }
    });
}


/**
 * buildCuisineFilter
 * ------------------
 * Given an array of saved restaurant objects, extracts the distinct
 * `cuisine` values and appends them as <option> elements to the 'cuisine' filter
 *
 * @param {Array<{cuisine: string }>} savedRestaurants  Array of restaurant
 *        objects; each may carry a `cuisine` string (e.g. "Italian").
 * @param {HTMLSelectElement}          filterSelect       The <select> element
 *        that will receive the dynamically-created <option> children.
 *
 * @returns {void}  (options are added in-place; nothing is returned)
 */
function buildCuisineFilter(savedResturants, filterSelect) {
    const cuisines = [...new Set(
        savedResturants.map(r => r.cuisine)
            .filter(Boolean)
        )];

    cuisines.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.toLowerCase();
      opt.textContent = c;
      filterSelect.appendChild(opt);
    });
  }


/**
 * Filters the saved restaurants based on selected criteria and updates the displayed deck.
 *
 * @param {Object} filters - The filter criteria.
 * @param {string} filters.cuisine - The cuisine to filter by ('all' for no filter).
 * @param {string} filters.ratingMax - The maximum rating to include ('all' for no filter).
 * @param {string} filters.distanceMax - The maximum distance to include ('all' for no filter).
 * @param {Array<Object>} savedRestaurants - The array of restaurant objects to filter.
 *   Each restaurant object is expected to have at least the following properties:
 *   - {string} cuisine - The cuisine type.
 *   - {string|number} rating - The restaurant rating.
 *   - {string|number} distance - The restaurant distance.
 * @param {HTMLElement} deckList - The DOM element where filtered restaurant cards will be rendered.
 */
function applyFilters(filters, savedRestaurants, deckList) {
  const subset = savedRestaurants.filter(r => {
    // Cuisine
    const cuisineOk =
      filters.cuisine === 'all' ||
      (r.cuisine || '').toLowerCase() === filters.cuisine;

    // Rating ≤ selected
    const ratingOk =
      filters.ratingMax === 'all' ||
      (parseFloat(r.rating) || 0) <= parseFloat(filters.ratingMax);

    // Distance ≤ selected
    const distanceOk =
      filters.distanceMax === 'all' ||
      (parseFloat(r.distance) || 0) <= parseFloat(filters.distanceMax);

    // Only keep restaurants that satisfy all filters
    return cuisineOk && ratingOk && distanceOk;
  });

  renderDeck(subset, deckList);
}

/**
 * renderDeck
 * ----------
 * Renders the current “deck” of restaurant cards into a container element.
 * The function:
 *   • Clears any existing cards inside `deckList`.  
 *   • If `subset` is empty → shows an “empty-state” message and hides the
 *     “Clear Deck” button.  
 *   • Otherwise, for each restaurant object it builds a card (`div`) with
 *     name, image, rating, distance, and cuisine tags, wires a click-handler
 *     (`handleCardClick`) that drives the left-side detail panel, and
 *     appends the card to `deckList`.  Finally, it makes the “Clear Deck”
 *     button visible.
 *
 * 
 * @param {Array} subset            Restaurants to render.
 * @param {HTMLElement} deckList    Container that receives the generated cards.
 * @returns {void}                  (DOM is updated in place; no return value)
 */
function renderDeck(subset, deckList) {
    deckList.innerHTML = ''
    if(!subset || subset.length == 0) {
      deckList.innerHTML ='<p class="empty-state" role="status">You haven\'t saved any restaurants yet. Swipe right on the main page to add some.</p>';
      document.querySelector('.clear-deck-btn').style.display = "none";
      return;
    }

    subset.forEach(r => {
        const div = document.createElement("div");
        // div.className = "collection-card-front";
        div.innerHTML=`
              <div class="collection-card-front">
                <h2>${r["name"]}</h2>
                <img
                  src="assets/restaurant.jpg"
                  alt="restaurant"
                  class="card-img"
                />
                <div class="details">
                  <img src="assets/dark-star-icon.png" alt="star icon" class="emoji"/>
                  <span class="rating"> ${r["rating"]} </span>
                  <span></span>
                  <img src="assets/location-icon.png" alt="star icon" class="emoji"/>
                  <span class="distance">${r["distance"]} mi</span>
                </div>
                <div class="tags">
                  <span class="tag">${r["cuisine"]}</span>
                  <span class="tag">cuisine</span>
                  <span class="tag">+2</span>
                </div>
              </div>`;
        div.addEventListener('click', () => handleCardClick(r));

        deckList.appendChild(div);
        document.querySelector('.clear-deck-btn').style.display = "flex";
    });
  }


/**
 * Handles the event when a restaurant card is clicked.
 * Updates the detail view on the left panel with information about the selected restaurant.
 *
 * @param {Object} r - The restaurant object containing details to display.
 * @param {string} r.name - The name of the restaurant.
 * @param {string} r.cuisine - The type of cuisine the restaurant offers.
 * @param {string} [r.description] - The description of the restaurant.
 */
function handleCardClick(r) {
  const deckBody = document.getElementById('left-body');
  deckBody._r = r;
  deckBody.dataset.side = "front";
  deckBody.dataset.name = r.name;
  deckBody.dataset.address = "123 Cobblestone Core";
  deckBody.dataset.hours = "12 AM - 10 PM";
  deckBody.dataset.phone_number = "XXX-XXX-XXX";
  deckBody.dataset.website = r.website ?? "";
  deckBody.dataset.photo1src = r.menuImages[0];
  deckBody.dataset.photo2src = r.menuImages[1];
  deckBody.dataset.photo3src = r.menuImages[2];

  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  if (isMobile){
    // remove card area if in mobile view
    deckBody.classList.remove('hidden');
    const cardArea = document.querySelector('.card-area');
    cardArea.classList.add('hidden');
 
    // go back button
    const backBtnContainer = document.getElementById("back-button-container");
    backBtnContainer.innerHTML = `
    <button id="back-button" class="back-button">
      <span class="back-button-arrow">←</span>
      <span class="back-button-text"> Return to Collection</span>
    </button>`;
    backBtnContainer.classList.remove('hidden');

    backBtnContainer.addEventListener('click', () => {
      // hide 
      deckBody.classList.add('hidden');
      backBtnContainer.classList.add('hidden');
      cardArea.classList.remove('hidden');
    });
  }
  
  deckBody.innerHTML = `
    <article class="detail-card">
      <h3>${r.name}</h3>
      <img src="assets/restaurant.jpg" alt="restaurant" class="card-img"/>
      <div class="details">
        <img src="assets/dark-star-icon.png" alt="star icon" class="emoji"/>
        <span class="rating"> ${r["rating"]} </span>
        <span></span>
        <img src="assets/location-icon.png" alt="star icon" class="emoji"/>
        <span class="distance">${r["distance"]} mi</span>
      </div>
      <div class="tags">
        <span class="tag">${r.cuisine}</span>
        <span class="tag">cuisine</span>
        <span class="tag">+2</span>
      </div>
      <p>${r.description ?? ''}</p>
    </article>
  `;
}