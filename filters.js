// track user selections data (PLACEHOLDER)
const userSelections = {
    cuisine: [],
    price: null,
    distance: null,
    rating: null,
  };
  
  //function to show selected filter options
  function showOptions(type) {
    document.querySelector('.filter-selection').classList.add('hidden');
    document.querySelectorAll('.filter-options').forEach(el => el.classList.add('hidden'));
    document.getElementById(`${type}-options`).classList.remove('hidden');
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
  

  // confirm selection
  function confirmSelection(type) {
    if (type === 'cuisine') {
      const selected = document.querySelectorAll('#cuisine-options .option-btn.selected');
      userSelections.cuisine = Array.from(selected).map(btn => btn.dataset.value);
    }
  
    if (type === 'price') {
      const val = document.getElementById('price-input').value;
      if (validatePositiveNumber(val)) {
        userSelections.price = parseFloat(val);
      } else {
        alert('Please enter a valid max price.');
        return;
      }
    }
  
    if (type === 'distance') {
      const val = document.getElementById('distance-input').value;
      if (validatePositiveNumber(val)) {
        userSelections.distance = parseFloat(val);
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
      } else {
        alert('Please enter a valid rating (0–5).');
        return;
      }
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
  