document.addEventListener('DOMContentLoaded', async () => {
    let data = JSON.parse(localStorage.getItem('restaurantData'));


    if (!data) {
        const res = await fetch('data/restaurants.json');
        data = await res.json();
        localStorage.setItem('restaurantData', JSON.stringify(data));
    }

    renderRestaurants(data);

    setupButtons();

});

let current_idx = 0;

function renderRestaurants(data) {
    const container = document.getElementById('card-container');
    container.innerHTML ='';

    let idx = 0;
    data.forEach(r => {
        const div = document.createElement('div');
        div.classList.add('restaurant-card');
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
            </div>
        `;
        div.id = `restaurant_${idx}`;
        div.style.display = "none";
        idx += 1;
        container.appendChild(div);
    });

    let first = document.querySelector("#restaurant_0");
    first.style.display = 'block';
}

function setupButtons() {
    let rej = document.querySelector('button[title="Reject"]');
    rej.addEventListener("click", () => {
        let current = document.querySelector(`#restaurant_${current_idx}`);
        current.style.display = 'none';

        current_idx += 1;
        let newEl = document.querySelector(`#restaurant_${current_idx}`);
        newEl.style.display = 'block';
    });

    let accept = document.querySelector('button[title="Accept"]');
    accept.addEventListener("click", () => {
        let current = document.querySelector(`#restaurant_${current_idx}`);
        current.style.display = 'none';

        current_idx += 1;
        let newEl = document.querySelector(`#restaurant_${current_idx}`);
        newEl.style.display = 'block';
    });
}

// -------------------


