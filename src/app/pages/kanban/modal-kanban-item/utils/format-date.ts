export function getMinDate() {
  const dateToday = new Date();
  const year = dateToday.getFullYear();
  const month = String(dateToday.getMonth() + 1).padStart(2, '0');
  const day = String(dateToday.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
}
