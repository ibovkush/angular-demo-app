import { FormGroup, ValidatorFn } from '@angular/forms';

export const mustNotMatch =
  (controlName: string, matchingControlName: string, isHideOnOtherErrors: boolean): ValidatorFn =>
  (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (isHideOnOtherErrors && matchingControl.errors && !matchingControl.errors.mustNotMatch) {
      return null;
    }

    if (control.value === matchingControl.value) {
      matchingControl.setErrors({ mustNotMatch: true });
    }
  };
