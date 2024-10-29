import Strings from "./validationTypes/Strings.js";
import Numbers from "./validationTypes/Numbers.js";
import Arrays from "./validationTypes/Arrays.js";
import Objects from "./validationTypes/Objects.js";

export class Validator {
  constructor() {
    this.customValidators = {
      string: {},
      number: {},
    };
  }

  string() {
    return new Strings(this.customValidators.string);
  }

  number() {
    return new Numbers(this.customValidators.number);
  }

  array() {
    return new Arrays();
  }

  object() {
    return new Objects();
  }

  addValidator(type, name, fn) {
    this.customValidators[type][name] = fn;
  }
}
