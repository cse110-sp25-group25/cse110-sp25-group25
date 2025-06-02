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
function getUniqueCuisines() {
  const all = JSON.parse(localStorage.getItem('restaurantData') || '[]');
  const set = new Set(all.map(r => r.cuisine).filter(c => typeof c === 'string'));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
const STEPS = ['cuisine', 'price', 'distance', 'rating'];
let current   = 0;          // index inside STEPS
let editMode  = false;      // true = user only fixes one step, then exit

 /**
 * Advances to the next step in the filter selection process.
 *
 * @returns {void}
 */
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
  document.getElementById('summary').classList.remove('hidden');
}



//function to show selected filter options
/**
 * @param {string} type - The type of filter to display options for.
 * @return {void}
 * */
function showOptions(type) {
  document.querySelector('.filter-selection').classList.add('hidden');
  document.querySelectorAll('.filter-options').forEach(el => el.classList.add('hidden'));
  document.getElementById(`${type}-options`).classList.remove('hidden');
}

// Event listener for DOMContentLoaded to initialize the filter options

document.addEventListener('DOMContentLoaded', () => {
  const cuisineGrid = document.getElementById('cuisine-grid');
  if (cuisineGrid) {
    cuisineGrid.innerHTML = '';

    // Get all unique cuisines
    const cuisines = getUniqueCuisines();
    cuisines.forEach(cuisine => {
      const btn = document.createElement('button');
      btn.classList.add('option-btn');
      btn.setAttribute('data-value', cuisine);
      btn.textContent = cuisine;
      cuisineGrid.appendChild(btn);
    });

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
  const skipAll = document.getElementById('skip-btn');

  skipAll.addEventListener('click', () => {
    // leave defaults (every filter empty/null)
    window.location.href = 'swipe.html';  
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
  if (type === 'cuisine') {
    const selected = document.querySelectorAll('#cuisine-options .option-btn.selected');
    if (selected === '') {                       // user left it blank  ⇒  skip
      userSelections.cuisine = null;
    }
    else userSelections.cuisine = Array.from(selected).map(btn => btn.dataset.value);
  }

  if (type === 'price') {
    const val = document.getElementById('price-input').value;
    if (validatePositiveNumber(val)) {
      userSelections.price = parseFloat(val);
    } else if (val === '') { // user left it blank  ⇒  skip
      userSelections.price = null;
    }
    else{
      alert('Please enter a valid max price.');
      return;
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
    const val = document.getElementById('rating-input').value;
    if (validatePositiveNumber(val) && val >= 0 && val <= 5) {
      userSelections.rating = parseFloat(val);
    } else if (val === '') { // user left it blank  ⇒  skip
      userSelections.rating = null;
    }
    else {
      alert('Please enter a valid rating (0–5).');
      return;
    }
  }

  localStorage.setItem('userSelections', JSON.stringify(userSelections));

  if (editMode) {
    finalise();          // one-shot edit → exit
  } else {
    nextStep();          // continue to next question
  }
  //REMOVE LATER (just for testing)
  console.log('Current Selections:', userSelections);
  alert(`Saved ${type} selection!`);
}


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

window.showOptions = showOptions;
window.confirmSelection = confirmSelection;