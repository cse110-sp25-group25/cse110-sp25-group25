function validatePositiveNumber(value) {
    const num = parseFloat(value);
    return !isNaN(num) && num >= 0;
  }

describe('validatePositiveNumber', () => {
  test('returns true for positive numbers', () => {
    expect(validatePositiveNumber('5')).toBe(true);
    expect(validatePositiveNumber('0')).toBe(true);
    expect(validatePositiveNumber('3.14')).toBe(true);
  });

  test('returns false for negative numbers', () => {
    expect(validatePositiveNumber('-1')).toBe(false);
    expect(validatePositiveNumber('-0.01')).toBe(false);
  });

  test('returns false for non-numeric input', () => {
    expect(validatePositiveNumber('abc')).toBe(false);
    expect(validatePositiveNumber('')).toBe(false);
    expect(validatePositiveNumber(null)).toBe(false);
    expect(validatePositiveNumber(undefined)).toBe(false);
  });

  test('parses numbers with extra spaces', () => {
    expect(validatePositiveNumber('  7.5  ')).toBe(true);
  });
});