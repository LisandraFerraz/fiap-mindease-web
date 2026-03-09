export function FormatDateName(date: Date): string {
  const parsedData = date.toLocaleDateString("pt-PT");

  const day = parsedData.slice(0, 2);
  const month = getMonthName[parsedData.slice(3, 5)];
  const year = parsedData.slice(6, 10);

  return `${day} de ${month} de ${year}`;
}

export const getMonthName: { [key: string]: string } = {
  "01": "Janeiro",
  "02": "Fevereiro",
  "03": "Março",
  "04": "Abril",
  "05": "Maio",
  "06": "Junho",
  "07": "Julho",
  "08": "Agosto",
  "09": "Setembro",
  "10": "Outubro",
  "11": "Nobembro",
  "12": "Dezembro",
};
