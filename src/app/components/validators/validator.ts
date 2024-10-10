import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const creditCardNumber = () => {
  return (control: AbstractControl): ValidationErrors | null => {
    debugger;
    let cardNumber = control.value;
    const isCardNumberValid = cardNumber && cardNumber.replace(/-/g, '').length === 16;
    if (isCardNumberValid) {
      return null;
    }
    return {invalidCardNo: true};
  }
};

export const cardCvvNumber = () => {
  return (control: AbstractControl): ValidationErrors | null => {
    debugger;
    let cardCvvNumber = control.value;
    const isCardCvvNumberValid = cardCvvNumber && cardCvvNumber.length === 3;
    if (isCardCvvNumberValid) {
      return null;
    }
    return {invalidCardCvvNo: true};
  }
};


