export const hasEmptyValues = (prtObj: any) => {
  for (let obj in prtObj) {
    if (
      prtObj[obj] === null ||
      prtObj[obj] === '' ||
      prtObj[obj] === undefined ||
      prtObj[obj] < 1
    ) {
      return true;
    }
  }
  return false;
};

export const isValueEmpty = (value: any) => {
  if (value === null || value === '' || value === undefined || value < 1) {
    return true;
  }
  return false;
};
