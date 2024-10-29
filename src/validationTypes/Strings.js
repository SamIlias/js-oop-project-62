export default class Strings {
  constructor(customStringValidators) {
    this.checks = {};
    this.customValidators = customStringValidators;
  }

  isValid(validatedValue) {
    if (
      typeof validatedValue !== "string" &&
      validatedValue !== undefined &&
      validatedValue !== null
    ) {
      throw new Error(`Expected string, but received ${typeof validatedValue}`);
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
      return validatedValue ? true : false;
    };

    return this;
  }

  contains(substring) {
    this.checks.contains = (validatedValue) => {
      return validatedValue.includes(substring);
    };

    return this;
  }

  minLength(num = 1) {
    this.checks.minLength = (validatedValue) => {
      return validatedValue.length >= num;
    };

    return this;
  }
}