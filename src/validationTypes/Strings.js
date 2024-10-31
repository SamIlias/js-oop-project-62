export default class Strings {
  constructor(customStringValidators) {
    this.checks = {};
    this.customValidators = customStringValidators;
  }

  isValid(validatedValue) {
    if (
      typeof validatedValue !== 'string'
      && validatedValue !== undefined
      && validatedValue !== null
    ) {
      throw new Error(`Expected string, but received ${typeof validatedValue}`);
    }

    let result = true;
    Object.values(this.checks).forEach((validFn) => {
      result = result && validFn(validatedValue);
    });

    return result;
  }

  test(name, ...params) {
    this.checks[name] = (validatedValue) => this.customValidators[name](validatedValue, ...params);

    return this;
  }

  required() {
    this.checks.required = (validatedValue) => !!validatedValue;

    return this;
  }

  contains(substring) {
    this.checks.contains = (validatedValue) => validatedValue.includes(substring);

    return this;
  }

  minLength(num = 1) {
    this.checks.minLength = (validatedValue) => validatedValue.length >= num;

    return this;
  }
}
