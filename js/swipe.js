document.addEventListener('DOMContentLoaded', async () => {
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

  renderRestaurant(data);
  setupButtons();
});

function applyFilters(data, filters) {
  return data.filter(r => {
      if (filters.cuisine && r.cuisine !== filters.cuisine) return false;
      if (filters.price && r.price.length > filters.price.length) return false;
      // Parse distance and rating
      if (filters.distance && r.distance > parseFloat(filters.distance)) return false;
      if (filters.rating && r.rating < parseFloat(filters.rating)) return false;

      return true;
  });
}

function removeViewed(data, viewed) {
  return data.filter(r => {
    return !viewed.includes(+r.id);
});
}

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

function setupButtons() {
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
          const newCard = document.getElementById(`card_${newId}`);
          if (newCard) {
              newCard.style.display = 'block';
              newCard.classList.add('active-card');
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
          const newCard = document.getElementById(`card_${newId}`);
          if (newCard) {
              newCard.style.display = 'block';
              newCard.classList.add('active-card');
          }
      }, 500);

      const dataId = +current.getAttribute('data-id');
      saveToDeck(dataId);
      handleViewedCard(dataId);
  });
}

function handleViewedCard(id) {
  // simply save this id to local storage. this will just be reapplied as a filter
  const viewed = JSON.parse(localStorage.getItem('viewed')) || [];

  const exists = viewed.some( r=> r === id);
  if(!exists) {
    viewed.push(id);
    localStorage.setItem('viewed', JSON.stringify(viewed));
  }
}