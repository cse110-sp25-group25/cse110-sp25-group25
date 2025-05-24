window.addEventListener('DOMContentLoaded', init);

function init() {

    const deckList = document.querySelector(".deck-list");
    const clearBtn = document.querySelector('.clear-deck-btn');
    const filterSelect = document.getElementById('filter-select');
    const savedResturants = JSON.parse(localStorage.getItem('deck')) || [];

    // render resturant cards if they exist
    if(savedResturants.length ===0) {
        renderDeck(null, deckList);
    } else{
        renderDeck(savedResturants, deckList);
        buildCuisineFilter(savedResturants, filterSelect); // populate filter
    }

    // make the clear button functionality
    clearBtn.addEventListener('click', () => {
        localStorage.removeItem('deck');
        localStorage.removeItem('viewed');
        renderDeck(null, deckList);
        filterSelect.innerHTML = '<option value="all">All cuisines</option>';
    });

    // get subset of resturants from the filter
    filterSelect.addEventListener('change', ({ target }) => {
      const val = target.value;
      let subset;

      if (val === 'all') {
        // show all resturants
        subset = savedResturants;
      } else {
        //show only subset of resturants
        subset = savedResturants.filter(r => {
            const cuisine = (r.cuisine || '').toLowerCase();
            return cuisine === val.toLowerCase();
        });
      }
      renderDeck(subset, deckList);
    });
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

function renderDeck(subset, deckList) {
    deckList.innerHTML = ''
    if(!subset) {
      deckList.innerHTML ='<p class="empty-state" role="status">You haven\'t saved any restaurants yet. Swipe right on the main page to add some.</p>';
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
        deckList.appendChild(div);
    });
  }