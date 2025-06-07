// track user selections data (PLACEHOLDER)
const userSelections = {
    cuisine: [],
    price: null,
    distance: null,
    rating: null,
  };

  /**
 * Retrieves a sorted list of unique cuisines from restaurant data stored in localStorage.
 *
 * @returns {string[]} An alphabetically sorted array of unique cuisine strings.
 */
async function getUniqueCuisines() {
  let all = JSON.parse(localStorage.getItem('restaurantData') || '[]');
  if (all.length === 0) {

    const res = await fetch('data/restaurants.json');
    all = await res.json();
    localStorage.setItem('restaurantData', JSON.stringify(all));
  
  }
  all = JSON.parse(localStorage.getItem('restaurantData') || '[]');
  const set = new Set(all.map(r => r.cuisine).filter(c => typeof c === 'string'));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
const STEPS = ['cuisine', 'price', 'distance', 'rating'];
let current   = 0;          // index inside STEPS
let editMode  = false;      // true = user only fixes one step, then exit


/**
 * Updates the progress bar by setting the active step based on the current index.
 * 
 * Iterates through all elements with the class 'step', removing the 'active' class from each,
 * and then adds the 'active' class to the step that matches the current active index.
 */
function updateProgressBar() {
  const steps = document.querySelectorAll('.step');

  steps.forEach((step, index) => {
    const stepElement = step;
    stepElement.classList.remove('active');
    
    if (index === current) {
      stepElement.classList.add('active');
    }
  });
}

function nextStep() {
  current += 1;
  if (current < STEPS.length) {
    showOptions(STEPS[current]);
  } else {
    finalise();    
  }
}

/**
 * Finalizes the filter selections and displays a summary.
 *  *
 * @returns {void}
 * */
function finalise() {
  document.getElementById('sum-cuisine' ).textContent = userSelections.cuisine.join(', ') || '—';
  document.getElementById('sum-price'   ).textContent = userSelections.price    ?? '—';
  document.getElementById('sum-distance').textContent = userSelections.distance ?? '—';
  document.getElementById('sum-rating'  ).textContent = userSelections.rating   ?? '—';

  document.querySelectorAll('main > section').forEach(s => s.classList.add('hidden'));
  document.querySelector('.progress-bar').classList.add('hidden');
  document.getElementById('summary').classList.remove('hidden');
}

/**
 * Shows the selected filter options and reveals the progress bar.
 * 
 * Hides the filter selection section and all filter option sections, then shows
 * the specific filter options for the given type. Also makes the progress bar visible
 * and updates it to highlight the current step.
 * 
 * @param {string} type - The type of filter to show options for ('cuisine', 'price', 'distance', 'rating')
 */
function showOptions(type) {
  document.querySelectorAll('.filter-options').forEach(el => el.classList.add('hidden'));
  document.getElementById(`${type}-options`).classList.remove('hidden');

  // Show progress bar when a filter is selected
  document.querySelector('.progress-bar').classList.remove('hidden');

  // Update progress bar based on the step
  const stepIndex = STEPS.indexOf(type);
  if (stepIndex !== -1) {
    current = stepIndex;
    updateProgressBar();
  }
}

// Event listener for DOMContentLoaded to initialize the filter options

document.addEventListener('DOMContentLoaded', async () => {
  const cuisineGrid = document.getElementById('cuisine-grid');
  const starContainer = document.getElementById('star-container');

  // Load cuisines dynamically
  if (cuisineGrid) {
    cuisineGrid.innerHTML = '';
    const cuisines = await getUniqueCuisines();
    cuisines.forEach(cuisine => {
      const btn = document.createElement('button');
      btn.classList.add('option-btn');
      btn.setAttribute('data-value', cuisine);
      btn.textContent = cuisine;
      cuisineGrid.appendChild(btn);
    });
  }

    showOptions('cuisine')

  // Set up price button selection
  const priceButtons = document.querySelectorAll('.price-btn');
  priceButtons.forEach(button => {
    button.addEventListener('click', function() {
      priceButtons.forEach(btn => btn.classList.remove('selected'));
      this.classList.add('selected');
      
      // Store the selected price range in userSelections
      userSelections.price = this.dataset.price;
    });
  });

  // Load stars dynamically
  if (starContainer) {
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('img');
      star.src = 'assets/star-icon.png';
      star.alt = `${i} star`;
      star.classList.add('star');
      star.dataset.value = i;
      star.addEventListener('click', () => {
        document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
        for (let j = 0; j < i; j++) {
          document.querySelectorAll('.star')[j].classList.add('selected');
        }
        userSelections.rating = i;
      });
      starContainer.appendChild(star);
    }
  }
  
  // Set up event listeners for filter buttons
document.querySelectorAll('.option-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.closest('#cuisine-options')) {
      btn.classList.toggle('selected');
    } else {
      // For others, make single select
      const siblings = btn.parentElement.querySelectorAll('.option-btn');
      siblings.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    }
  });
});

  document.getElementById('done-btn').addEventListener('click', () => {
    window.location.href = 'swipe.html';        // or swipe.html
  });
  });

  

/**
 * Confirms the user's selection for a specific filter type and updates the userSelections object.
 * @param {string} type - The type of filter being confirmed (e.g., 'cuisine', 'price', 'distance', 'rating').
 * @return {void}
 * */
function confirmSelection(type) {
  confirmAndChangeSelection(type, null);
}

/**
 * Confirms the user's selection, updates the userSelections object, and redirects the user to a specified filter.
 * @param {string} type - The type of filter being confirmed (e.g., 'cuisine', 'price', 'distance', 'rating').
 * @param {string} newType - The next filter to show (if using navigation)
 * @return {void}
 * */
function confirmAndChangeSelection(type, newType) {
  if (type === 'cuisine') {
    const selected = document.querySelectorAll('#cuisine-options .option-btn.selected');
    if (selected === '') {                       // user left it blank  ⇒  skip
      userSelections.cuisine = null;
    }
    else userSelections.cuisine = Array.from(selected).map(btn => btn.dataset.value);
  }

  if (type === 'price') {
    const selectedPriceBtn = document.querySelector('.price-btn.selected');
    if (selectedPriceBtn) {
      userSelections.price = selectedPriceBtn.dataset.price;
    } 
    else { // user left it blank  ⇒  skip
      userSelections.price = null; 
    }
  }

  if (type === 'distance') {
    const val = document.getElementById('distance-input').value;
    if (validatePositiveNumber(val)) {
      userSelections.distance = parseFloat(val);
    } 
    else if (val === '') { // user left it blank  ⇒  skip
      userSelections.distance = null;
    } else {
      alert('Please enter a valid max distance.');
      return;
    }
  }
  
  //need to check how rating works (logic currently PLACEHOLDER)
  if (type === 'rating') {
    const selectedStars = document.querySelectorAll('.star.selected');
    if (selectedStars.length === 0) {
      userSelections.rating = null;
    } else {
      userSelections.rating = selectedStars.length;
    }
  }

  localStorage.setItem('userSelections', JSON.stringify(userSelections));

  if (newType == null) {
    if (editMode) {
      finalise();          // one-shot edit → exit
    } else {
      nextStep();          // continue to next question
    }
  }
  else {
    showOptions(newType);
  }


}


//Set up event listeners for progress bar steps
document.querySelectorAll('.step').forEach(btn => {
  btn.addEventListener('click', () => {
    const oldType = STEPS[current];
    const newType = btn.getAttribute('data-step');
    confirmAndChangeSelection(oldType, newType);
  });
});


// function to check positive/numeric input
/**
 * Validates that the input value is a positive number.
 * @param {string} value - The input value to validate.
 * @returns {boolean} True if the value is a valid positive number, false otherwise.
 */
function validatePositiveNumber(value) {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0;
}


// to pass ESlint
window.confirmSelection = confirmSelection;