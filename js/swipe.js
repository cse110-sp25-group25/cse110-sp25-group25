// nathans umerged code

document.addEventListener('DOMContentLoaded', async () => {
    let data = JSON.parse(localStorage.getItem('restaurantData'));


    if (!data) {
        const res = await fetch('data/restaurants.json');
        data = await res.json();
        localStorage.setItem('restaurantData', JSON.stringify(data));
    }

    renderRestaurants(data);

});

function renderRestaurants(data) {
    const container = document.getElementById('card-container');
    container.innerHTML ='';

    data.forEach(r => {
        const div = document.createElement('div');
        div.classList.add('restaurant-card');
         div.innerHTML = `
      <h3>${r.name}</h3>
      <p>Cuisine: ${r.cuisine}</p>
      <p>Price: ${r.price}</p>
      <p>Distance: ${r.distance} mi</p>
      <p>Rating: ${r.rating}</p>
      <button onclick="saveToDeck(${r.id})">Save to Deck</button>
    `;
    container.appendChild(div);

    /*
<div class="restaurant-card" data-id="1" data-name="Pizza Place">
          <h2>Restaurant Title</h2>
          <img
            src="assets/restaurant.jpg"
            alt="restaurant"
            class="card-img"
          />
          <div class="details">
            <span class="rating">⭐ 4.3</span>
            <span class="distance">📍 10 mi</span>
          </div>
          <div class="tags">
            <span class="tag">cuisine</span>
            <span class="tag">cuisine</span>
            <span class="tag">+2</span>
          </div>
        </div>
    */
  });
}

// -------------------


