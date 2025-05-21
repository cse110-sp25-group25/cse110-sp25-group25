document.addEventListener('DOMContentLoaded', async () => {
    let data = JSON.parse(localStorage.getItem('restaurantData'));

    if (!data) {
        const res = await fetch('data/restaurants.json');
        data = await res.json();
        localStorage.setItem('restaurantData', JSON.stringify(data));
    }

    // TODO for someone else: just replace this data with filtered data
    renderRestaurant(data);
    setupButtons();
});


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

function setupButtons() {
    let rej = document.querySelector('button[title="Reject"]');
    rej.addEventListener("click", () => {
        let current = document.querySelector('.active-card');
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

        // TODO for someone else: make sure this card never shows up again (even on reload)
    });

    let accept = document.querySelector('button[title="Accept"]');
    accept.addEventListener("click", () => {
        let current = document.querySelector('.active-card');
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

        // TODO for someone else: save card to collection (localstorage)
        // TODO for someone else: make sure this card never shows up again (even on reload)
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