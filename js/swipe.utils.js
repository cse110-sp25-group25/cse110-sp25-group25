// js/swipe.utils.js
function applyFilters(data, filters) {
    return data.filter(r => {
      if (filters.cuisine && r.cuisine !== filters.cuisine) return false;
      if (filters.price && r.price.length > filters.price.length) return false;
      if (filters.distance && r.distance > parseFloat(filters.distance)) return false;
      if (filters.rating && r.rating < parseFloat(filters.rating)) return false;
      return true;
    });
  }
  
  function removeViewed(data, viewed) {
    return data.filter(r => !viewed.includes(+r.id));
  }
  
  export { applyFilters, removeViewed };
  