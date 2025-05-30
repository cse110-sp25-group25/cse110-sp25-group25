// track user selections data (PLACEHOLDER)
const userSelections = {
    cuisine: [],
    price: null,
    distance: null,
    rating: null,
  };

const STEPS = ['cuisine', 'price', 'distance', 'rating'];
let current   = 0;          // index inside STEPS
let editMode  = false;      // true = user only fixes one step, then exit

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

function finalise() {
  document.getElementById('sum-cuisine' ).textContent = userSelections.cuisine.join(', ') || '—';
  document.getElementById('sum-price'   ).textContent = userSelections.price    ?? '—';
  document.getElementById('sum-distance').textContent = userSelections.distance ?? '—';
  document.getElementById('sum-rating'  ).textContent = userSelections.rating   ?? '—';

  document.querySelectorAll('main > section').forEach(s => s.classList.add('hidden'));
  document.querySelector('.progress-bar').classList.add('hidden');
  document.getElementById('summary').classList.remove('hidden');
}



//function to show selected filter options
function showOptions(type) {
  document.querySelector('.filter-selection').classList.add('hidden');
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
  
document.querySelectorAll('.option-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // For multi-select (Cuisine), allow multiple
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
document.addEventListener('DOMContentLoaded', () => {
  const skipAll = document.getElementById('skip-btn');

  skipAll.addEventListener('click', () => {
    // leave defaults (every filter empty/null)
    window.location.href = 'swipe.html';  
  });
});

// document.getElementById('skip-btn').addEventListener('click', () => {
//   const step = STEPS[current];
//   userSelections[step] = step === 'cuisine' ? [] : null;

//   localStorage.setItem('userSelections', JSON.stringify(userSelections));

//   if (editMode) {
//     finalise();
//   } else {
//     nextStep();
//   }
// });

document.getElementById('done-btn').addEventListener('click', () => {
  window.location.href = 'swipe.html';        // or swipe.html
});

  

// confirm selection
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
function validatePositiveNumber(value) {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0;
}


// to pass ESlint

window.showOptions = showOptions;
window.confirmSelection = confirmSelection;