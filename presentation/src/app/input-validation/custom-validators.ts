import { AbstractControl, Form, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { INPUT_VALIDATION_RULES } from './input-validation-rules';

export class CustomValidators {

  public static matchingPasswordsValidator(control: FormGroup) {
    let password = control.controls['password'].value;
    let confirmedPassword = control.controls['confirmPassword'].value;

    return password === confirmedPassword ? false : { notSame: true }
  }

  public static passwordStrengthValidator(control: FormGroup): { [key: string]: boolean } | null {
    const password = control.value;
    const hasUppercase = INPUT_VALIDATION_RULES.regex.hasUpperCase.test(password);
    const hasLowercase = INPUT_VALIDATION_RULES.regex.hasLowerCase.test(password);
    const hasNumber = INPUT_VALIDATION_RULES.regex.hasNumber.test(password);
    const hasSpecialChar = INPUT_VALIDATION_RULES.regex.hasSpecialChar.test(password);

    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      return { 'passwordStrength': true };
    }

    return null;
  }

  public static emailDomainValidator(control: FormGroup): { [key: string]: boolean } | null
   {
    const email = control.value;
    const emailPattern = INPUT_VALIDATION_RULES.regex.emailPattern;
  
    if (!emailPattern.test(email)) {
      return { 'missingDomain': true };
    }
  
    return null; 
  }

  public static nameMinimumLengthValidator(control: FormGroup): { [s: string]: boolean } | null 
  {
    const hasMinimumLength = control.value.trim().length >= 2;
    return !hasMinimumLength ? { minLength: true } : null;
  }

  public static nameContainsNumbersValidator(control: FormGroup) {
    const hasNumbers = INPUT_VALIDATION_RULES.regex.hasNumber.test(control.value);  
    return hasNumbers ? { containsNumbers: true } : null;
  }

  public static nameInvalidCharacterValidator(control : FormGroup): { [s: string]: boolean } | null
  {
    const pattern =  INPUT_VALIDATION_RULES.regex.hasAccentedAlphanumeric;
    return pattern.test(control.value) ? null : { invalidCharacters: true };
  }
}
