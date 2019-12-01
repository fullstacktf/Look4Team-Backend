export default class Validator {
  static validate(validators: []): boolean {
    validators.forEach((validator: Function) => {
      if (!validator()) {
        return false;
      }
    });
    return true;
  }

  static isNumeric(arg: string): boolean {
    const regex: RegExp = /^\d+$/;
    if (!arg.match(regex)) {
      return false;
    }
    return true;
  }

  static hasSpecialChars(arg: string): boolean {
    const regex: RegExp = /`|~|!|@|#|\$|%|\^|&|\*|\(|\)|\+|=|\[|\{|\]|\}|\||\\|'|<|,|\.|>|\?|\/|""|;|:|\s/g;
    if (!arg.match(regex)) {
      return false;
    }
    return true;
  }

  static isEmail(arg: string): boolean {
    const regex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!arg.match(regex)) {
      return false;
    }
    return true;
  }

  static isValidDate(arg: string): boolean {
    const regex: RegExp = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    if (!arg.match(regex)) {
      return false;
    }
    return true;
  }
}
