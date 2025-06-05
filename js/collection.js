'use strict';

window.addEventListener('DOMContentLoaded', init);

/**
 * Initializes the collection page by rendering
 * saved restaurants and binding the clear button.
 */
function init() {
  renderDeck();

  const clearBtn = document.getElementById('clear-deck-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem('deck');
      localStorage.removeItem('viewed');
      renderDeck();
    });
  }
}

/**
 * Renders the user's saved restaurant cards from localStorage.
 */
function renderDeck() {
  const container = document.getElementById('deck-list');
  if (!container) return;

  container.innerHTML = '';

  const saved = JSON.parse(localStorage.getItem('deck')) || [];

  if (saved.length === 0) {
    container.innerHTML = '<p>No saved restaurants.</p>';
    return;
  }

  saved.forEach((r) => {
    const div = document.createElement('div');
    div.classList.add('restaurant-card');
    div.innerHTML = `
      <h2>${r.name}</h2>
      <img
        src="assets/restaurant.jpg"
        alt="restaurant"
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
    container.appendChild(div);
  });
}
