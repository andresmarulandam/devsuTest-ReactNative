import { ERROR_MESSAGES, VALIDATION } from '../../utils/constants';
import {
  validateDates,
  validateDescription,
  validateId,
  validateLogoUrl,
  validateName,
} from '../../utils/validators';

describe('validators', () => {
  describe('validateId', () => {
    test('should return error when id is empty', () => {
      expect(validateId('')).toBe(ERROR_MESSAGES.idRequired);
      expect(validateId('   ')).toBe(ERROR_MESSAGES.idRequired);
    });

    test('should return error when id is too short', () => {
      const shortId = 'a'.repeat(VALIDATION.id.min - 1);
      expect(validateId(shortId)).toBe(ERROR_MESSAGES.idMinLength);
    });

    test('should return error when id is too long', () => {
      const longId = 'a'.repeat(VALIDATION.id.max + 1);
      expect(validateId(longId)).toBe(ERROR_MESSAGES.idMaxLength);
    });

    test('should return null for valid id', () => {
      const validId = 'a'.repeat(VALIDATION.id.min);
      expect(validateId(validId)).toBeNull();

      const validId2 = 'a'.repeat(VALIDATION.id.max);
      expect(validateId(validId2)).toBeNull();
    });
  });

  describe('validateName', () => {
    test('should return error when name is empty', () => {
      expect(validateName('')).toBe(ERROR_MESSAGES.nameRequired);
      expect(validateName('   ')).toBe(ERROR_MESSAGES.nameRequired);
    });

    test('should return error when name is too short', () => {
      const shortName = 'a'.repeat(VALIDATION.name.min - 1);
      expect(validateName(shortName)).toBe(ERROR_MESSAGES.nameMinLength);
    });

    test('should return error when name is too long', () => {
      const longName = 'a'.repeat(VALIDATION.name.max + 1);
      expect(validateName(longName)).toBe(ERROR_MESSAGES.nameMaxLength);
    });

    test('should return null for valid name', () => {
      const validName = 'a'.repeat(VALIDATION.name.min);
      expect(validateName(validName)).toBeNull();
    });
  });

  describe('validateDescription', () => {
    test('should return error when description is empty', () => {
      expect(validateDescription('')).toBe(ERROR_MESSAGES.descriptionRequired);
      expect(validateDescription('   ')).toBe(
        ERROR_MESSAGES.descriptionRequired,
      );
    });

    test('should return error when description is too short', () => {
      const shortDesc = 'a'.repeat(VALIDATION.description.min - 1);
      expect(validateDescription(shortDesc)).toBe(
        ERROR_MESSAGES.descriptionMinLength,
      );
    });

    test('should return error when description is too long', () => {
      const longDesc = 'a'.repeat(VALIDATION.description.max + 1);
      expect(validateDescription(longDesc)).toBe(
        ERROR_MESSAGES.descriptionMaxLength,
      );
    });

    test('should return null for valid description', () => {
      const validDesc = 'a'.repeat(VALIDATION.description.min);
      expect(validateDescription(validDesc)).toBeNull();
    });
  });

  describe('validateLogo', () => {
    test('should return error when logo is empty', () => {
      expect(validateLogoUrl('')).toBe(ERROR_MESSAGES.logoRequired);
      expect(validateLogoUrl('   ')).toBe(ERROR_MESSAGES.logoRequired);
    });

    test('should return error for invalid URL', () => {
      expect(validateLogoUrl('not-a-url')).toBe(ERROR_MESSAGES.logoInvalidUrl);
      expect(validateLogoUrl('http://')).toBe(ERROR_MESSAGES.logoInvalidUrl);
      expect(validateLogoUrl('https://')).toBe(ERROR_MESSAGES.logoInvalidUrl);
    });

    test('should return null for valid URL', () => {
      expect(validateLogoUrl('https://example.com/logo.png')).toBeNull();
      expect(validateLogoUrl('http://example.com')).toBeNull();
      expect(validateLogoUrl('https://sub.domain.com/image.jpg')).toBeNull();
    });
  });

  describe('validateDates', () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

    const nextYear = new Date(tomorrow);
    nextYear.setUTCFullYear(nextYear.getUTCFullYear() + 1);

    test('should validate correct dates', () => {
      const result = validateDates(tomorrow, nextYear);
      expect(result.releaseError).toBeNull();
      expect(result.revisionError).toBeNull();
    });

    test('should return error when release date is in the past', () => {
      const yesterday = new Date(today);
      yesterday.setUTCDate(yesterday.getUTCDate() - 1);

      const result = validateDates(yesterday, nextYear);
      expect(result.releaseError).toBe(ERROR_MESSAGES.dateReleaseInvalid);
    });

    test('should return error when revision date is not exactly one year later', () => {
      const wrongRevision = new Date(tomorrow);
      wrongRevision.setUTCFullYear(wrongRevision.getUTCFullYear() + 1);
      wrongRevision.setUTCDate(wrongRevision.getUTCDate() + 1);

      const result = validateDates(tomorrow, wrongRevision);
      expect(result.revisionError).toBe(ERROR_MESSAGES.dateRevisionInvalid);
    });
  });
});
