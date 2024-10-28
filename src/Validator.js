import Strings from "./types/Strings.js";
import Numbers from "./types/Numbers.js";
import Arrays from "./types/Arrays.js";
import Objects from "./types/Objects.js";

export default class Validator {
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
