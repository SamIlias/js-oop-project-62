import Strings from "./types/Strings.js";
import Numbers from "./types/Numbers.js";

export default class Validator {
  string() {
    return new Strings();
  }

  number() {
    return new Numbers();
  }
}
