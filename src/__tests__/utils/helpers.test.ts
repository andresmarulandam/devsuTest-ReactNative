import {
  ensureDate,
  formatDateForInput,
  formatDateToString,
  parseStringToDate,
} from '../../utils/helpers';

describe('helpers', () => {
  describe('formatDateForInput', () => {
    test('should format date to YYYY-MM-DD', () => {
      const date = new Date(Date.UTC(2024, 0, 15));
      expect(formatDateForInput(date)).toBe('2024-01-15');
    });

    test('should return empty string for invalid date', () => {
      expect(formatDateForInput(undefined)).toBe('');
      expect(formatDateForInput(null as any)).toBe('');
      expect(formatDateForInput('invalid' as any)).toBe('');
    });

    test('should pad single digits with zero', () => {
      const date = new Date(Date.UTC(2024, 2, 5));
      expect(formatDateForInput(date)).toBe('2024-03-05');
    });
  });

  describe('ensureDate', () => {
    test('should return Date object when input is Date', () => {
      const date = new Date();
      expect(ensureDate(date)).toBe(date);
    });

    test('should convert valid string to Date', () => {
      const dateStr = '2024-01-15';
      const result = ensureDate(dateStr);
      expect(result).toBeInstanceOf(Date);
      expect(result?.getUTCFullYear()).toBe(2024);
      expect(result?.getUTCMonth()).toBe(0);
      expect(result?.getUTCDate()).toBe(15);
    });

    test('should return undefined for invalid string', () => {
      expect(ensureDate('invalid-date')).toBeUndefined();
      expect(ensureDate('')).toBeUndefined();
    });

    test('should return undefined for null/undefined', () => {
      expect(ensureDate(null)).toBeUndefined();
      expect(ensureDate(undefined)).toBeUndefined();
    });
  });

  describe('formatDateToString', () => {
    test('should format date to YYYY-MM-DD using local time', () => {
      const date = new Date(2024, 0, 15);
      expect(formatDateToString(date)).toBe('2024-01-15');
    });
  });

  describe('parseStringToDate', () => {
    test('should parse YYYY-MM-DD to Date', () => {
      const result = parseStringToDate('2024-01-15');
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
    });
  });
});
