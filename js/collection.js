window.addEventListener('DOMContentLoaded', init);

function init() {

    const deckList = document.querySelector(".deck-list");
    const clearBtn = document.querySelector('.clear-deck-btn');
    const cuisineFilter = document.getElementById('cuisine-filter');
    const ratingsFilter = document.getElementById('ratings-filter');
    const distanceFilter = document.getElementById('distance-filter');
    const savedRestaurants = JSON.parse(localStorage.getItem('deck')) || [];
    
    // left view card div
    const deckBody = document.getElementById('left-body');

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
        deckBody.innerHTML = `
          <style>
          .div-imgs{
            display:flex;
            gap:.5rem;
          }
          .div-imgs img{
            width:7rem;
            height:6rem;
            margin-top:2rem;
            margin-bottom:1.5rem;
            object-fit:cover;
            border-radius:.5rem;
          }
          </style>
          <article style="background:#fff; display:flex;flex-direction:column;gap:1rem;
          align-items:center;flex:1 1 auto;">

            <h3 style="font-size:3rem;margin:0">${deckBody.dataset.name}</h3>

            <div style="display:flex;align-items:center;gap:.6rem;font-size:.95rem;color:#555;">
              <span style="font-size:1.25rem;color:#9aca8e;">📍</span>
              <a style="color:#b86e32;text-decoration:underline;font-size:1.5rem;">${deckBody.dataset.address}</a>
            </div>

            <div style="display:flex;align-items:center;gap:.6rem;font-size:.95rem;color:#555;">
              <span style="font-size:1.25rem;color:#9aca8e;">🕒</span>
              <span style="font-size:1.5rem;">Hours: ${deckBody.dataset.hours}</span>
            </div>

            <div style="display:flex;align-items:center;gap:.8rem;font-size:.95rem;color:#555;">
              <span style="font-size:2rem;color:#9aca8e;">📞</span>
              <span style="font-size:1.5rem;">${deckBody.dataset.phone_number}</span>
            </div>

            <div class=div-imgs>
              <img src=${deckBody.dataset.photo1src}  alt="Dish 1">
              <img src=${deckBody.dataset.photo2src}  alt="Dish 2">
              <img src=${deckBody.dataset.photo3src}  alt="Dish 3">
            </div>

            <a href="${deckBody.dataset.website}" target="_blank" rel="noopener noreferrer"
              style="
                color:#b86e32;
                font-weight:600;
                align-self:center;">View Menu <span aria-hidden="true">↗︎</span></a>
          </article>`;}
    });
}


/**
 * buildCuisineFilter
 * ------------------
 * Given an array of saved restaurant objects, extracts the distinct
 * `cuisine` values and appends them as <option> elements to the 'cuisine' filter
 *
 * @param {Array<{ cuisine?: string }>} savedRestaurants  Array of restaurant
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
        div.className = "collection-restaurant-card";
        div.innerHTML = `
            <h2>${r["name"]}</h2>
            <img
                src="assets/restaurant.jpg"
                alt="restaurant"
                class="card-img"
            />
            <div class="details">
              <span class="rating">⭐ ${r["rating"]}</span>
              <span class="distance">📍 ${r["distance"]} mi</span>
            </div>
            <div class="tags">
              <span class="tag">${r["cuisine"]}</span>
              <span class="tag">cuisine</span>
              <span class="tag">+2</span>
            </div>
        `;
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
  deckBody.dataset.name = r.name
  deckBody.dataset.address = "123 Cobblestone Core"
  deckBody.dataset.hours = "12 AM - 10 PM"
  deckBody.dataset.phone_number = "XXX-XXX-XXX"
  deckBody.dataset.website = "https://www.bonchon.com/"
  deckBody.dataset.photo1src = "assets/restaurant.jpg"
  deckBody.dataset.photo2src = "assets/restaurant.jpg"
  deckBody.dataset.photo3src = "assets/restaurant.jpg"

  deckBody.innerHTML = `
    <article class="detail-card">
      <img src="assets/restaurant.jpg" alt="restaurant" class="card-img"/>
      <h3>${r.name}</h3>
      <div class="tags">
        <span class="tag">${r.cuisine}</span>
        <span class="tag">cuisine</span>
        <span class="tag">+2</span>
      </div>
      <p>${r.description ?? ''}</p>
    </article>
  `;
}