/* eslint-disable class-methods-use-this */
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "userPassword", async: false })
export default class UserPasswordValidator implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    const hasMinLength = text.length >= 8;
    const hasMaxLength = text.length <= 32;
    const hasNumber = /[0-9]/.test(text);
    const hasUppercase = /[A-Z]/.test(text);
    const hasLowerCase = /[a-z]]/.test(text);
    const hasSymbol = /[()[\]!~=\-?#@$%^&*]/.test(text);

    return hasMaxLength
      && hasMinLength
      && hasNumber
      && hasSymbol
      && hasUppercase
      && hasLowerCase;
  }

  defaultMessage() {
    return "Password does not meet minimum requirements";
  }
}
