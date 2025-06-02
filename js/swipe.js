// import {applyFilters, removeViewed} from './swipe.utils.js'

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

    if(!data || data.length == 0) {
        console.warn("no data, can't render");
        return;
    }

    renderRestaurant(data);
    setupButtons();
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

function renderRestaurant(data) {
    const layout = document.querySelector('.swipe-layout');
    const existingHeader = layout.querySelector('.swipe-header');

    // 1) If we haven’t already inserted it, create & insert it
    if (!existingHeader) {
        const header = document.createElement('div');
        header.className = 'swipe-header';
        header.innerHTML = `
            <span class="instruction-text">click the card to view details</span>
            <img src="assets/help-icon.png" alt="help" class="help-icon" />
    `;
    // put it immediately before the swipe-container
    const container = layout.querySelector('.swipe-container');
    layout.insertBefore(header, container);
  }
    
    const container           = document.getElementById('card-container');
    const leftReviewContainer = document.getElementById('left-review-container');
    const rightReviewContainer= document.getElementById('right-review-container');
    container.innerHTML           = '';
    leftReviewContainer.innerHTML = '';
    rightReviewContainer.innerHTML= '';

    let id = 0;
    data.forEach(r => {
        const div = document.createElement('div');
        div.classList.add('restaurant-card');
        // TODO: this is pretty hardcoded. Fix this in the future, especially the cuisine tags that 
        // need to depend on the number of cuisines a restaurant is marked with
        div.innerHTML = `
            <div class="card-inner">
            <!-- Front -->
            <div class="card-front">
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
            </div>

            <!-- Back -->
            <div class="card-back">                
                <div class="card-details">
                  <h2>Restaurant Title</h2>
                    <p>📍 <a href="#">Insert Address</a></p>
                    <p>🕒 Open until XX:XX PM</p>
                    <p>📞 XXX - XXX - XXXX</p>
                    <div class="menu-images">
                      <img src="assets/food1.jpg" alt="food">
                      <img src="assets/food2.jpg" alt="food">
                      <img src="assets/food3.jpg" alt="food">
                    </div>
                    <a href="#" class="view-menu">View Menu ↗</a>
                </div>
            </div>
          </div>
        `;
        div.setAttribute('data-id', r["id"]);
        div.id = `card_${id}`;
        div.style.display = "none";
        container.appendChild(div);

        const leftReview = document.createElement('div');
        leftReview.classList.add('reviews', 'left');
        leftReview.id = `left_review_${id}`;
        leftReview.innerHTML = `
            <p>"nice clean environment"<br><span>- customer 1</span></p>
            <p>"yum"<br><span>- customer 2</span></p>
            <p>"good food"<br><span>- awesome customer</span></p>
        `;
        leftReview.style.display = 'none';
        leftReviewContainer.appendChild(leftReview);


        const rightReview = document.createElement('div');
        rightReview.classList.add('reviews', 'right');
        rightReview.id = `right_review_${id}`;
        rightReview.innerHTML = `
            <p>"nice relaxing environment"<br><span>- customer 3</span></p>
            <p>"so good"<br><span>- customer 4</span></p>
            <p>"love it!"<br><span>- customer 5</span></p>
        `;
        rightReview.style.display = 'none';
        rightReviewContainer.appendChild(rightReview);

        setupFlipping(div);
        id += 1;
    });

    let first = document.getElementById('card_0');
    first.classList.add("active-card");
    first.style.display = 'block';
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
  

function setupButtons() {
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
            
            let newChild = document.getElementById(`card_${newId}`)
            newChild.style.display = 'block';
            newChild.classList.add('active-card');
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
            let newChild = document.getElementById(`card_${newId}`)
            newChild.style.display = 'block';
            newChild.classList.add('active-card');
        }, 500);
        // save card to collection (localstorage)
        let dataId = +current.getAttribute('data-id')
        saveToDeck(dataId);
        // make sure this card never shows up again (even on reload)
        handleViewedCard(dataId);
    });
}

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

            // Hide hints when flipped
            if (leftHint && rightHint) {
                leftHint.style.display = 'none';
                rightHint.style.display = 'none';
            }

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

function handleViewedCard(id) {
    // simply save this id to local storage. this will just be reapplied as a filter
    const viewed = JSON.parse(localStorage.getItem('viewed')) || [];

    const exists = viewed.some( r=> r === id);
    if(!exists) {
      viewed.push(id);
      localStorage.setItem('viewed', JSON.stringify(viewed));
    }
}

