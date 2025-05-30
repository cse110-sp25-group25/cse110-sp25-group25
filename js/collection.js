window.addEventListener('DOMContentLoaded', init);

function init() {

    const deckList = document.querySelector(".deck-list");
    const clearBtn = document.querySelector('.clear-deck-btn');
    const cuisineFilter = document.getElementById('cuisine-filter');
    const ratingsFilter = document.getElementById('ratings-filter');
    const distanceFilter = document.getElementById('distance-filter');
    const savedRestaurants = JSON.parse(localStorage.getItem('deck')) || [];


    // render resturant cards if they exist
    if(savedRestaurants.length === 0) {
        renderDeck([], deckList);
    } else{
        // renderDeck(savedRestaurants, deckList);
        buildCuisineFilter(savedRestaurants, cuisineFilter); // populate filter
    }

    // make the clear button functionality
    clearBtn.addEventListener('click', () => {
        localStorage.removeItem('deck');
        localStorage.removeItem('viewed');
        renderDeck([], deckList);
        // filterSelect.innerHTML = '<option value="all">All cuisines</option>';
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
}

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

function handleCardClick(r) {
  const deckBody = document.getElementById('left-body');

  deckBody.innerHTML = `
    <article class="detail-card">
      <img src="assets/restaurant.jpg" alt="restaurant" class="card-img"/>
      <h3>${r.name}</h3>
      <div class="tags">
        <span class="tag">${r["cuisine"]}</span>
        <span class="tag">cuisine</span>
        <span class="tag">+2</span>
      </div>
      <p>${r.description ?? ''}</p>
    </article>
  `;
}