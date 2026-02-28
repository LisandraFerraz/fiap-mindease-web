import { hasEmptyValues } from './validate-empty-values';

export const isAuthFormValid = (authObj: any) => {
  for (let obj in authObj) {
    if (
      hasEmptyValues(authObj) ||
      (obj === 'email' && !isEmailValid(authObj[obj])) ||
      (obj === 'password' && authObj[obj]?.length < 6) ||
      (obj === 'nome' && authObj[obj]?.length < 3)
    ) {
      return false;
    }
  }
  return true;
};

export const isEmailValid = (email: string): boolean => {
  var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email.match(regex)) return true;
  return false;
};
