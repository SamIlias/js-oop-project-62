import Strings from "./types/Strings.js";
import Numbers from "./types/Numbers.js";
import Arrays from "./types/Arrays.js";
import Objects from "./types/Objects.js";

export default class Validator {
  string() {
    return new Strings();
  }

  number() {
    return new Numbers();
  }

  array() {
    return new Arrays();
  }

  object() {
    return new Objects();
  }
}
