document.addEventListener('DOMContentLoaded', async () => {
    let data = JSON.parse(localStorage.getItem('restaurantData'));


    if (!data) {
        const res = await fetch('data/restaurants.json');
        data = await res.json();
        localStorage.setItem('restaurantData', JSON.stringify(data));
    }

    renderRestaraunts(data);

});

function renderRestaraunts(data) {
    const container = document.getElementById('restaurant-list');
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
  });
}