export default class Arrays {
  constructor() {
    this.checks = {};
  }

  isValid(validatedValue) {
    if (
      !Array.isArray(validatedValue)
      && validatedValue !== undefined
      && validatedValue !== null
    ) {
      throw new Error(
        `Expected array, but something else was received: ${typeof validatedValue}`
      );
    }

    let result = true;
    Object.values(this.checks).forEach((validFn) => {
      result = result && validFn(validatedValue);
    });

    return result;
  }

  required() {
    this.checks.required = (validatedValue) => Array.isArray(validatedValue);

    return this;
  }

  sizeof(num) {
    this.checks.sizeof = (validatedValue) =>
      validatedValue ? validatedValue.length === num : false;

    return this;
  }
}
