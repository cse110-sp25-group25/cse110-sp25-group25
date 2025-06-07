/* global page */

const BASE_URL = 'http://127.0.0.1:3000';

// Helper function to log steps
const logStep = (step) => {
  console.log(`\nStep: ${step}`);
};

// Helper function to wait for element to be clickable
const waitForClickable = async (selector, timeout = 5000) => {
  await page.waitForSelector(selector, { visible: true, timeout });
  await page.waitForFunction(
    (sel) => {
      const element = document.querySelector(sel);
      if (!element) return false;
      const style = window.getComputedStyle(element);
      return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    },
    { timeout },
    selector
  );
};

// Helper function to clear localStorage
const clearLocalStorage = async () => {
  try {
    await page.evaluate(() => {
      window.localStorage.clear();
    });
  } catch {
    console.log('Note: Could not clear localStorage before navigation');
  }
};

describe('Restaurant Crisis App', () => {
  beforeAll(async () => {
    logStep('Starting tests');
    await page.goto(BASE_URL);
    await clearLocalStorage();
  });

  beforeEach(async () => {
    await page.goto(BASE_URL);
  });

  test('should load the home page', async () => {
    logStep('Testing home page load');
    const title = await page.title();
    expect(title).toBe('Restaurant Crisis');
  }, 10000);

  test('should navigate to filters page', async () => {
    logStep('Testing navigation to filters page');
    await waitForClickable('a[href="filters.html"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.click('a[href="filters.html"]')
    ]);
    const title = await page.title();
    expect(title).toBe('Restaurant Crisis');
  }, 10000);

  test('should navigate to collection page', async () => {
    logStep('Testing navigation to collection page');
    await waitForClickable('a[href="collection.html"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.click('a[href="collection.html"]')
    ]);
    const title = await page.title();
    expect(title).toBe('Restaurant Crisis');
  }, 10000);

  test('should navigate to swipe page', async () => {
    logStep('Testing navigation to swipe page');
    // First go to home page to ensure we have the PICK RANDOM button
    await page.goto(BASE_URL);
    await waitForClickable('button.button-type1');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.click('button.button-type1')
    ]);
    const title = await page.title();
    expect(title).toBe('Swipe Restaurants');
  }, 15000);

  // Filters page tests
  test('should handle filter selections', async () => {
    logStep('Testing filter selections');
    await page.goto(`${BASE_URL}/filters.html`);
    
    // Wait for cuisine options to be loaded
    logStep('Waiting for cuisine options to load');
    await page.waitForSelector('#cuisine-options', { visible: true });
    
    // Wait for the cuisine grid to be populated with buttons
    logStep('Waiting for cuisine buttons to be populated');
    await page.waitForFunction(() => {
      const grid = document.querySelector('#cuisine-grid');
      return grid && grid.querySelectorAll('.option-btn').length > 0;
    }, { timeout: 10000 });
    
    // Get the first cuisine button and click it
    logStep('Selecting first cuisine option');
    const cuisineBtn = await page.waitForSelector('.option-btn');
    const cuisineText = await cuisineBtn.evaluate(el => el.textContent);
    await cuisineBtn.evaluate(btn => btn.click());
    expect(await cuisineBtn.evaluate(el => el.classList.contains('selected'))).toBe(true);
    logStep(`Selected cuisine: ${cuisineText}`);

    // Click confirm button for cuisine
    logStep('Confirming cuisine selection');
    const confirmBtn = await page.waitForSelector('button[type="submit"]', { visible: true });
    await confirmBtn.evaluate(btn => btn.click());

    // Wait for price input to be visible and interactive
    logStep('Waiting for price options to be visible');
    await page.waitForSelector('#price-options', { visible: true });
    await page.waitForFunction(() => {
      const priceOptions = document.querySelector('#price-options');
      return priceOptions && !priceOptions.classList.contains('hidden');
    }, { timeout: 10000 });
    
    logStep('Testing price input');
    await page.waitForSelector('#price-input', { visible: true });
    await page.waitForFunction(() => {
      const input = document.querySelector('#price-input');
      return input && !input.disabled;
    }, { timeout: 10000 });
    
    await page.type('#price-input', '2');
    logStep('Price entered: 2');
    
    // Wait for the confirm button to be visible and clickable
    logStep('Waiting for price confirm button');
    await page.waitForFunction(() => {
      const form = document.querySelector('#price-options form');
      const button = form && form.querySelector('button[type="submit"]');
      return button && !button.disabled;
    }, { timeout: 10000 });
    
    const confirmBtn2 = await page.waitForSelector('#price-options button[type="submit"]', { visible: true });
    logStep('Found price confirm button, clicking...');
    await confirmBtn2.evaluate(btn => btn.click());
    logStep('Price confirmed');
    
    // Wait for distance input to be visible
    logStep('Waiting for distance options to be visible');
    await page.waitForSelector('#distance-options', { visible: true });
    await page.waitForFunction(() => {
      const distanceOptions = document.querySelector('#distance-options');
      return distanceOptions && !distanceOptions.classList.contains('hidden');
    }, { timeout: 10000 });
    
    logStep('Testing distance input');
    await page.waitForSelector('#distance-input', { visible: true });
    await page.waitForFunction(() => {
      const input = document.querySelector('#distance-input');
      return input && !input.disabled;
    }, { timeout: 10000 });
    
    await page.type('#distance-input', '5');
    logStep('Distance entered: 5');
    
    // Wait for the confirm button to be visible and clickable
    logStep('Waiting for distance confirm button');
    await page.waitForFunction(() => {
      const form = document.querySelector('#distance-options form');
      const button = form && form.querySelector('button[type="submit"]');
      return button && !button.disabled;
    }, { timeout: 10000 });
    
    const confirmBtn3 = await page.waitForSelector('#distance-options button[type="submit"]', { visible: true });
    logStep('Found distance confirm button, clicking...');
    await confirmBtn3.evaluate(btn => btn.click());
    logStep('Distance confirmed');
    
    // Wait for rating section to be visible
    logStep('Waiting for rating options to be visible');
    await page.waitForSelector('#rating-options', { visible: true });
    await page.waitForFunction(() => {
      const ratingOptions = document.querySelector('#rating-options');
      return ratingOptions && !ratingOptions.classList.contains('hidden');
    }, { timeout: 10000 });
    
    logStep('Testing rating selection');
    const star = await page.waitForSelector('.star', { visible: true });
    await star.evaluate(s => s.click());
    expect(await star.evaluate(el => el.classList.contains('selected'))).toBe(true);
    logStep('Rating selected');
    
    // Wait for the next button to be visible and clickable
    logStep('Waiting for rating next button');
    await page.waitForFunction(() => {
      const form = document.querySelector('#rating-options form');
      const button = form && form.querySelector('button[type="submit"]');
      return button && !button.disabled;
    }, { timeout: 10000 });
    
    const nextBtn = await page.waitForSelector('#rating-options button[type="submit"]', { visible: true });
    logStep('Found rating next button, clicking...');
    await nextBtn.evaluate(btn => btn.click());
    logStep('Rating confirmed');
  }, 45000);

  test('should handle clear filters button', async () => {
    logStep('Testing clear filters button');
    await page.goto(`${BASE_URL}/swipe.html`);
    
    // Wait for the clear filters button to be visible
    logStep('Waiting for clear filters button');
    await waitForClickable('#clear-filters-btn');
    
    // Click the clear filters button
    logStep('Clicking clear filters button');
    await page.click('#clear-filters-btn');
    
    // Wait for the alert and accept it
    logStep('Waiting for alert');
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('All filters have been cleared. To set new ones, go back to the filters page.');
      await dialog.accept();
    });
    
    // Verify localStorage is cleared
    logStep('Verifying localStorage is cleared');
    const userSelections = await page.evaluate(() => localStorage.getItem('userSelections'));
    expect(userSelections).toBeNull();
  }, 15000);

  // Swipe page tests
  test('should handle swipe interactions', async () => {
    logStep('Testing swipe interactions');
    await page.goto(`${BASE_URL}/swipe.html`);
    
    // Wait for the card container to be loaded
    await page.waitForSelector('#card-container', { visible: true });
    
    logStep('Testing accept button');
    const acceptBtn = await page.waitForSelector('button[title="Accept"]', { visible: true });
    await acceptBtn.evaluate(btn => btn.click());
    
    logStep('Testing reject button');
    const rejectBtn = await page.waitForSelector('button[title="Reject"]', { visible: true });
    await rejectBtn.evaluate(btn => btn.click());
    
    logStep('Testing card flip');
    const card = await page.waitForSelector('.restaurant-card', { visible: true });
    await card.evaluate(c => c.click());
    expect(await card.evaluate(el => el.classList.contains('flipped'))).toBe(true);
  }, 30000);

  // Collection page tests
  test('should handle collection interactions', async () => {
    logStep('Testing collection interactions');
    await page.goto(`${BASE_URL}/collection.html`);
    
    // Wait for the page to be fully loaded
    await page.waitForSelector('.deck-list', { visible: true });
    
    logStep('Testing filter dropdowns');
    await page.waitForSelector('#cuisine-filter', { visible: true });
    await page.select('#cuisine-filter', 'Italian');
    await page.select('#ratings-filter', '4');
    await page.select('#distance-filter', '2');
    
    // Reset filters to show all cards
    logStep('Resetting filters to show all cards');
    await page.select('#cuisine-filter', 'all');
    await page.select('#ratings-filter', 'all');
    await page.select('#distance-filter', 'all');
    
    logStep('Testing card click for details');
    const card = await page.waitForSelector('.collection-card-front', { visible: true });
    if (card) {
      await card.evaluate(c => c.click());
      const detailCard = await page.waitForSelector('.detail-card', { visible: true });
      expect(detailCard).not.toBeNull();
    }
  }, 30000);

  test('should handle clear deck button', async () => {
    logStep('Testing clear deck button');
    await page.goto(`${BASE_URL}/collection.html`);
    
    await page.waitForSelector('.deck-list', { visible: true });
    const clearBtn = await page.waitForSelector('.clear-deck-btn', { visible: true });
    await clearBtn.evaluate(btn => btn.click());
    
    // Verify localStorage is cleared
    logStep('Verifying localStorage is cleared');
    const deck = await page.evaluate(() => localStorage.getItem('deck'));
    expect(deck).toBeNull();
  }, 15000);
}); 