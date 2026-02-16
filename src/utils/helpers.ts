// src/utils/helpers.ts
export const ensureDate = (date: any): Date | undefined => {
  if (!date) return undefined;

  if (date instanceof Date && !isNaN(date.getTime())) {
    return date;
  }

  if (typeof date === 'string') {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }

  return undefined;
};

export const formatDateForInput = (date: any): string => {
  const validDate = ensureDate(date);
  if (!validDate) return '';

  const year = validDate.getFullYear();
  const month = String(validDate.getMonth() + 1).padStart(2, '0');
  const day = String(validDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
