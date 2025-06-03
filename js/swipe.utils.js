// js/swipe.utils.js

/**
 * A function to remove the subset of data that doesn't satisfy the desired filters
 * @param {Array} data original list of data
 * @param {Array} filters list of filters to apply
 * @returns the subset of data that satisfies the desired filters
 */
function applyFilters(data, filters) {
  return data.filter(r => {
      if (filters.cuisine && filters.cuisine.length>0 && !filters.cuisine.includes(r.cuisine)){
          return false;
      } 
      if (filters.price && r.price.length > filters.price.length) return false;
      // Parse distance and rating
      if (filters.distance && r.distance > parseFloat(filters.distance)) return false;
      if (filters.rating && r.rating < parseFloat(filters.rating)) return false;

      return true;
});
}

/**
* A function that takes in a list of data, a list of viewed elements, and returns the subset of the original list
* that is not in the second.
* @param data original list
* @param viewed items to remove
* @returns the set difference data \ viewed
*/
function removeViewed(data, viewed) {
  return data.filter(r => {
      return !viewed.includes(+r.id);
  });
}
  
export { applyFilters, removeViewed };
  