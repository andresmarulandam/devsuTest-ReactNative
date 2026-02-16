export const formatDateForInput = (date: any): string => {
  const validDate = ensureDate(date);
  if (!validDate) return '';

  const year = validDate.getUTCFullYear();
  const month = String(validDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(validDate.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const ensureDate = (date: any): Date | undefined => {
  if (!date) return undefined;

  if (date instanceof Date && !isNaN(date.getTime())) {
    return date;
  }

  if (typeof date === 'string') {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const parsedDate = new Date(`${date}T00:00:00Z`);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }

    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }

  return undefined;
};

export const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const parseStringToDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};
