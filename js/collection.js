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
    const random = data[Math.floor(Math.random() * data.length)];
    renderRestaurants(random);
    renderDeck();

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

function renderRestaurants(r) {
    const container = document.getElementById('restaurant-list');
    container.innerHTML ='';

    if (Array.isArray(r)) {
      console.warn("expected single rest, obtained array");
      r = r[Math.floor(Math.random() * r.length)];
    }

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
}


  function saveToDeck(id) {
    const all = JSON.parse(localStorage.getItem('restaurantData'));
    const saved = JSON.parse(localStorage.getItem('deck')) || [];

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
      renderDeck();
    } else {
      alert('already in deck');
    }
  }

  document.addEventListener('DOMContentLoaded', renderDeck);


  function renderDeck() {
    const container = document.getElementById("deck-list");
    container.innerHTML ='';

    const saved = JSON.parse(localStorage.getItem('deck')) || [];

    if(saved.length ===0) {
      container.innerHTML = '<p>no saved restaurants.</p>';
      return;
    }

    
    saved.forEach(r => {
      const div = document.createElement("div");
      div.classList.add("restaurant-card");
      div.innerHTML = `
      <h3>${r.name}</h3>
      <p>Cuisine: ${r.cuisine}</p>
      <p>Price: ${r.price}</p>
      <p>Distance: ${r.distance} mi</p>
      <p>Rating: ${r.rating}</p>
    `;
    container.appendChild(div);
    });

  
      const clearBtn = document.getElementById('clear-deck-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          localStorage.removeItem('deck');
          renderDeck();
        });
      }
    

    function clearDeck() {
      localStorage.removeItem('deck');
      renderDeck();
    }
  }
  window.saveToDeck = saveToDeck;
