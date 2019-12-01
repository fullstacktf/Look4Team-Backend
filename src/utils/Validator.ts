export default class Validator {
  static validate(input: string, validators: []): boolean {
    validators.forEach((validator: Function) => {
      if (!validator(input)) {
        return false;
      }
    });
    return true;
  }

  static isNumeric(input: string): boolean {
    const regex: RegExp = /^\d+$/;
    if (!input.match(regex)) {
      return false;
    }
    return true;
  }

  static hasSpecialChars(input: string): boolean {
    const regex: RegExp = /`|~|!|@|#|\$|%|\^|&|\*|\(|\)|\+|=|\[|\{|\]|\}|\||\\|'|<|,|\.|>|\?|\/|""|;|:|\s/g;
    if (!input.match(regex)) {
      return false;
    }
    return true;
  }

  static isEmail(input: string): boolean {
    const regex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!input.match(regex)) {
      return false;
    }
    return true;
  }

  static isValidDate(input: string): boolean {
    const regex: RegExp = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    if (!input.match(regex)) {
      return false;
    }
    return true;
  }
}
