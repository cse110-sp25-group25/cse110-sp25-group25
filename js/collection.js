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
    renderRestaraunts(data);

});

function applyFilters(data, filters) {
  return data.filter(r => {
    if (filters.cuisine && r.cuisine !== filters.cuisine) return false;
    if (filters.price && r.price > filters.price) return false;
    if (filters.distance && r.distance > filters.distance) return false;
    if (filters.rating && r.rating < filters.rating) return false;
    return true;
  });
}

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


  function saveToDeck(id) {
    const all = JSON.parse(localStorage.getItem('restaurantData'));
    const saved = JSON.parse(localStorage.getItem('deck'));

    const toAdd = all.find(r => r.id === id);
    if(!toAdd) {
      alert("Restaraunt N/A");
      return;
    }

    const exists = saved.some( r=> r.id === id);
    if(!exists) {
      saved.push(toAdd);
      localStorage.setItem('deck', JSON.stringify(saved));
      alert("saved");
    } else {
      alert('already in deck');
    }
  }
