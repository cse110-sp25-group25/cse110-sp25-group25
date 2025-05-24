document.addEventListener('DOMContentLoaded', async () => {
    let data = JSON.parse(localStorage.getItem('restaurantData'));

    if (!data) {
        const res = await fetch('data/restaurants.json');
        data = await res.json();
        localStorage.setItem('restaurantData', JSON.stringify(data));
    }

    // TODO for someone else: just replace this data with filtered data
    renderRestaurant(data);
    setupButtons(data);

});


function renderRestaurant(data) {
    const container = document.getElementById('card-container');
    container.innerHTML ='';

    let id = 0;
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
        div.id = id;
        id += 1;
        div.style.display = "none";
        container.appendChild(div);
    });

    let first = document.getElementById('0');
    first.classList.add("active-card");
    first.style.display = 'block';
}

function setupButtons(data) {
    let swipedCount   = 0;
    const totalCards  = data.length;

    const resetButton = document.querySelector('.button-type3');
    resetButton.style.display = "none";

    let rej = document.querySelector('button[title="Reject"]');
    rej.addEventListener("click", () => {
        let current = document.querySelector('.active-card');
        current.classList.add('swipe-left');

        setTimeout(() => {
            current.style.display = 'none';
            current.classList.remove('swipe-left');
            current.classList.remove('active-card');

            let newId = Number(current.id) + 1;
            swipedCount += 1;
            
            let newChild = document.getElementById(newId)
            if (newChild){
                newChild.style.display = 'block';
                newChild.classList.add('active-card');
            }
            if (swipedCount == totalCards) {
                checkIfAllSwiped(data);
            }
        }, 300);

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

            let newId = Number(current.id) + 1;
            swipedCount += 1;
            
            let newChild = document.getElementById(newId)
            if (newChild){
                newChild.style.display = 'block';
                newChild.classList.add('active-card');
            }
            if (swipedCount == totalCards){
                checkIfAllSwiped(data);
            }
        }, 300);

        // TODO for someone else: save card to collection (localstorage)
        // TODO for someone else: make sure this card never shows up again (even on reload)

        // show empty screen if no more cards left
    });
}

 function checkIfAllSwiped(data) {
    const endScreen = document.getElementById("end-screen");
    const resetButton = document.querySelector('.button-type3');

    // display end screen
    endScreen.style.display = "block";

    // show reset button
    resetButton.style.display = "block";


    // hide other two buttons
    const buttons = document.querySelector('.swipe-buttons');
    buttons.style.display = "none";
    
    
    /* reset button functionality */
    resetButton.addEventListener("click", () => {
      // hide end screen
      endScreen.style.display = "none";
    
      // display buttons
      const buttons = document.querySelector('.swipe-buttons');
      buttons.style.display = "flex";

      renderRestaurant(data);
      setupButtons(data);
    });
}