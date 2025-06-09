import { applyFilters, removeViewed } from '../js/swipe.js';

describe('Swipe Utility Functions', () => {
  const mockData = [
    { id: 1, cuisine: 'Italian', price: '$$', distance: 1.5, rating: 4.5 },
    { id: 2, cuisine: 'Japanese', price: '$$$', distance: 2.5, rating: 4.0 },
    { id: 3, cuisine: 'Italian', price: '$', distance: 3.0, rating: 3.5 }
  ];

  test('applyFilters filters based on cuisine', () => {
    const filters = { cuisine: 'Italian' };
    const result = applyFilters(mockData, filters);
    expect(result.length).toBe(2);
    expect(result.every(r => r.cuisine === 'Italian')).toBe(true);
  });

  test('removeViewed filters out viewed IDs', () => {
    const viewed = [2];
    const result = removeViewed(mockData, viewed);
    expect(result.length).toBe(2);
    expect(result.some(r => r.id === 2)).toBe(false);
  });
});
