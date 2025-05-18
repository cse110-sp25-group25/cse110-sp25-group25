let restaurants = [];
let current_idx = 0;

document.addEventListener('DOMContentLoaded', async () => {
    let data = JSON.parse(localStorage.getItem('restaurantData'));
    if (!data) {
        const res = await fetch('data/restaurants.json');
        data = await res.json();
        localStorage.setItem('restaurantData', JSON.stringify(data));
    }
    restaurants = data;
    renderRestaurants(data);
    current_idx = findNextIndex(0);
    updateSavedCount();
    setupButtons();
});


function renderRestaurants(data) {
    const container = document.getElementById('card-container');
    container.innerHTML = '';
    //store as hash set for O(1) lookup FWAEH
    const saved = new Set(getUserDeckIndices());
    let idx = 0;

    data.forEach(r => {
        // Skip saved
        if (saved.has(idx)) {
            idx++;
            return;
        }

        const div = document.createElement('div');
        div.classList.add('restaurant-card');
        div.innerHTML = `
            <h2>${r.name}</h2>
            <img
                src="${r.image || 'assets/restaurant.jpg'}"
                alt="${r.name}"
                class="card-img"
            />
            <div class="details">
                <span class="rating">⭐ ${r.rating}</span>
                <span class="distance">📍 ${r.distance} mi</span>
            </div>
            <div class="tags">
                <span class="tag">${r.cuisine}</span>
                <span class="tag">cuisine</span>
                <span class="tag">+2</span>
            </div>
        `;
        div.id = `restaurant_${idx}`;
        div.style.display = 'none';
        container.appendChild(div);

        idx++;
    });

    // Find first unsaved index to show
    let firstIdx = findNextIndex(0);

    const first = document.querySelector(`#restaurant_${firstIdx}`);
    if (first) first.style.display = 'block';
}

function setupButtons() {
    let rej = document.querySelector('button[title="Reject"]');
    rej.addEventListener("click", () => {
        let current = document.querySelector(`#restaurant_${current_idx}`);
        current.style.display = 'none';

        current_idx = findNextIndex(current_idx + 1);
        // instead of adding 1, we update current_idx based on the next available restaurant
        // that was NOT already saved by the user. same for accept button.
        let newEl = document.querySelector(`#restaurant_${current_idx}`);
        newEl.style.display = 'block';
    });

    let accept = document.querySelector('button[title="Accept"]');
    accept.addEventListener("click", () => {
        const deck = getUserDeckIndices();
        if (!deck.includes(current_idx)) { // avoids repeated indices
          deck.push(current_idx);
          setUserDeckIndices(deck);
        }
        updateSavedCount();
        
        let current = document.querySelector(`#restaurant_${current_idx}`);
        current.style.display = 'none';

        current_idx = findNextIndex(current_idx + 1);
        let newEl = document.querySelector(`#restaurant_${current_idx}`);
        newEl.style.display = 'block';
    });
}

function getUserDeckIndices() {
    return JSON.parse(localStorage.getItem('userDeck') || '[]');
  }
function setUserDeckIndices(indices) {
    localStorage.setItem('userDeck', JSON.stringify(indices));
}

function updateSavedCount() {
    const el = document.querySelector('.saved-count');
    if (!el) return;
        el.textContent = `${getUserDeckIndices().length} saved`;
}   
//This function iterates thru the restaurant list until it finds a restaurant that
// is not already in the saved ist
// returns: int index
function findNextIndex(start) {
    const saved = getUserDeckIndices()
    let i = start;
    while (i < restaurants.length && saved.includes(i)) {
      i++;
    }
    return i;
  }
// -------------------


