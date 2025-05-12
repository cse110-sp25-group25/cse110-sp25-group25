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
  
  function confirmSelection(type) {
    let selected;
    if (type === 'distance') {
      selected = document.getElementById('distance-input').value;
    } else {
      selected = [...document.querySelectorAll(`#${type}-options .option-btn.selected`)]
        .map(btn => btn.dataset.value);
    }
  
    console.log(`${type} selected:`, selected);
  
    // Here you would store or pass this data forward
  }