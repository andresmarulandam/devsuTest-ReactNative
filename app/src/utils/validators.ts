import { Product, ProductFormErrors } from '../types';
import { ERROR_MESSAGES, VALIDATION } from './constants';

export const validateId = (id: string): string | null => {
  if (!id || id.trim() === '') {
    return ERROR_MESSAGES.idRequired;
  }

  if (id.length < VALIDATION.id.min) {
    return ERROR_MESSAGES.idMinLength;
  }

  if (id.length > VALIDATION.id.max) {
    return ERROR_MESSAGES.idMaxLength;
  }

  return null;
};

export const validateName = (name: string): string | null => {
  if (!name || name.trim() === '') {
    return ERROR_MESSAGES.nameRequired;
  }
  if (name.length < VALIDATION.name.min) {
    return ERROR_MESSAGES.nameMinLength;
  }
  if (name.length > VALIDATION.name.max) {
    return ERROR_MESSAGES.nameMaxLength;
  }
  return null;
};

export const validateDescription = (description: string): string | null => {
  if (!description || description.trim() === '') {
    return ERROR_MESSAGES.descriptionRequired;
  }
  if (description.length < VALIDATION.description.min) {
    return ERROR_MESSAGES.descriptionMinLength;
  }
  if (description.length > VALIDATION.description.max) {
    return ERROR_MESSAGES.descriptionMaxLength;
  }
  return null;
};

export const validateLogoUrl = (logo: string): string | null => {
  if (!logo || logo.trim() === '') {
    return ERROR_MESSAGES.logoRequired;
  }
  const urlPattern =
    /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
  if (!urlPattern.test(logo)) {
    return ERROR_MESSAGES.logoInvalidUrl;
  }
  return null;
};

export const validateDates = (
  date_release: Date,
  date_revision: Date,
): { releaseError: string | null; revisionError: string | null } => {
  let releaseError: string | null = null;
  let revisionError: string | null = null;

  if (!date_release) {
    releaseError = ERROR_MESSAGES.dateReleaseRequired;
  }
  if (!date_revision) {
    revisionError = ERROR_MESSAGES.dateRevisionRequired;
  }
  if (releaseError || revisionError) {
    return { releaseError, revisionError };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const release = new Date(date_release);
  release.setHours(0, 0, 0, 0);

  const revision = new Date(date_revision);
  revision.setHours(0, 0, 0, 0);

  if (release < today) {
    releaseError = ERROR_MESSAGES.dateReleaseInvalid;
  }

  const expectedRevision = new Date(release);

  expectedRevision.setFullYear(expectedRevision.getFullYear() + 1);
  expectedRevision.setHours(0, 0, 0, 0);

  if (revision.getTime() !== expectedRevision.getTime()) {
    revisionError = ERROR_MESSAGES.dateRevisionInvalid;
  }

  return { releaseError, revisionError };
};

export const validateProduct = async (
  product: Partial<Product>,
  checkIdExists?: (id: string) => Promise<boolean>,
): Promise<ProductFormErrors> => {
  const errors: ProductFormErrors = {};

  if (product.id !== undefined) {
    const idError = validateId(product.id);
    if (idError) {
      errors.id = idError;
    } else if (checkIdExists) {
      const exists = await checkIdExists(product.id);
      if (exists) {
        errors.id = ERROR_MESSAGES.idExists;
      }
    }
  }

  if (product.name !== undefined) {
    const nameError = validateName(product.name);
    if (nameError) errors.name = nameError;
  }

  if (product.description !== undefined) {
    const descriptionError = validateDescription(product.description);
    if (descriptionError) errors.description = descriptionError;
  }

  if (product.logo !== undefined) {
    const logoError = validateLogoUrl(product.logo);
    if (logoError) errors.logo = logoError;
  }

  if (product.date_release && product.date_revision) {
    const { releaseError, revisionError } = validateDates(
      product.date_release,
      product.date_revision,
    );
    if (releaseError) errors.date_release = releaseError;
    if (revisionError) errors.date_revision = revisionError;
  }

  return errors;
};
// Formatea una fecha Date a string YYYY-MM-DD
export const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

//Parsea un string YYYY-MM-DD a Date
export const parseStringToDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};
