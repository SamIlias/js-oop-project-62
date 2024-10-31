export default class Arrays {
  constructor() {
    this.checks = {};
  }

  isValid(validatedValue) {
    let result = true;

    Object.entries(this.checks).forEach(([key, value]) => {
      result = result && value.isValid(validatedValue[key]);
    });

    return result;
  }

  shape(schemasObj) {
    this.checks = schemasObj;

    return this;
  }
}
