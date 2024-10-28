export default class Numbers {
  constructor(customNumberValidators) {
    this.checks = {};
    this.falsy = [null, undefined, NaN];
    this.customValidators = customNumberValidators;
  }

  isValid(validatedValue) {
    if (
      typeof validatedValue !== "number" &&
      validatedValue !== undefined &&
      validatedValue !== null
    ) {
      throw new Error(`Expected number, but received ${typeof validatedValue}`);
    }

    let result = true;
    for (const validFn of Object.values(this.checks)) {
      result = result && validFn(validatedValue);
    }

    return result;
  }

  test(name, ...params) {
    this.checks[name] = (validatedValue) =>
      this.customValidators[name](validatedValue, ...params);

    return this;
  }

  required() {
    this.checks.required = (validatedValue) => {
      return this.falsy.includes(validatedValue) ? false : true;
    };

    return this;
  }

  positive() {
    this.checks.positive = (validatedValue) => {
      return this.falsy.includes(validatedValue) ? false : validatedValue > 0;
    };

    return this;
  }

  range(min, max) {
    this.checks.range = (validatedValue) => {
      return this.falsy.includes(validatedValue)
        ? false
        : min <= validatedValue && validatedValue <= max;
    };

    return this;
  }
}
