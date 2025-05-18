document.addEventListener('DOMContentLoaded', async () => {
    let data = JSON.parse(localStorage.getItem('restaurantData'));

    if (!data) {
        const res = await fetch('data/restaurants.json');
        data = await res.json();
        localStorage.setItem('restaurantData', JSON.stringify(data));
    }


    renderRestaurant(data);
    setupButtons(data);

});


function renderRestaurant(data) {
    const container = document.getElementById('card-container');
    container.innerHTML ='';

    let r = data[0];
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
    div.id = r["id"];
    div.style.display = "block";
    container.appendChild(div);
}

function setupButtons(data) {
    let rej = document.querySelector('button[title="Reject"]');
    rej.addEventListener("click", () => {
        let current = document.querySelector(`.restaurant-card`);
        current.classList.add('swipe-right');

        setTimeout(() => {
            current.style.display = 'none';
            current.classList.remove('swipe-right');
            newId = +current.id;
            let r = data[newId];

            current.innerHTML = `
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
            current.id = r["id"];

            setTimeout(() => {
                current.style.display = 'block';
            }, 50);
            
        }, 300);
    });

    let accept = document.querySelector('button[title="Accept"]');
    accept.addEventListener("click", () => {
        let current = document.querySelector(`.restaurant-card`);
        current.classList.add('swipe-left');

        setTimeout(() => {
            current.style.display = 'none';
            current.classList.remove('swipe-left');
            newId = +current.id;
            let r = data[newId];

            current.innerHTML = `
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
            current.id = r["id"];

            setTimeout(() => {
                current.style.display = 'block';
            }, 50);
            
        }, 300);

    });
}

// -------------------


