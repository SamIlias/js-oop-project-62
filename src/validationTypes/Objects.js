export default class Arrays {
  constructor() {
    this.checks = {};
  }

  isValid(validatedValue) {
    let result = true;

    for (const [key, value] of Object.entries(this.checks)) {
      result = result && value.isValid(validatedValue[key]);
    }

    return result;
  }

  shape(schemasObj) {
    this.checks = schemasObj;

    return this;
  }
}
