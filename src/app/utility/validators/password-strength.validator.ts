import { AbstractControl, ValidationErrors } from '@angular/forms';

export const PasswordStrengthValidator = (control: AbstractControl): ValidationErrors | null => {
  const value: string = control.value || '';

  if (!value) {
    return null;
  }

  const upperCaseCharacters = /[A-Z]+/g;
  if (upperCaseCharacters.test(value) === false) {
    return { passwordStrength: 'Should contain uppercase characters' };
  }

  const lowerCaseCharacters = /[a-z]+/g;
  if (lowerCaseCharacters.test(value) === false) {
    return { passwordStrength: 'Should contain lowercase characters' };
  }

  const numberCharacters = /[0-9]+/g;
  if (numberCharacters.test(value) === false) {
    return { passwordStrength: 'Should contain number characters' };
  }

  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (specialCharacters.test(value) === false) {
    return { passwordStrength: 'should contain special characters' };
  }
  return null;
};
