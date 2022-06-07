export const getFullDate: (date?: Date) => string = (date) => {
  if (!date) return '';
  const formatDate = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
  const [month, day, year] = formatDate.split('/');
  return `${year}-${month}-${day}`;
};
