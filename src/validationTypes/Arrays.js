export default class Arrays {
  constructor() {
    this.checks = {};
  }

  isValid(validatedValue) {
    if (
      !Array.isArray(validatedValue) &&
      validatedValue !== undefined &&
      validatedValue !== null
    ) {
      throw new Error(
        `Expected array, but something else was received: ${typeof validatedValue}`
      );
    }

    let result = true;
    for (const validFn of Object.values(this.checks)) {
      result = result && validFn(validatedValue);
    }

    return result;
  }

  required() {
    this.checks.required = (validatedValue) => {
      return Array.isArray(validatedValue);
    };

    return this;
  }

  sizeof(num) {
    this.checks.sizeof = (validatedValue) => {
      return validatedValue ? validatedValue.length === num : false;
    };

    return this;
  }
}
