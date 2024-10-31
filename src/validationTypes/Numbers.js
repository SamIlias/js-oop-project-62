export default class Numbers {
  constructor(customNumberValidators) {
    this.checks = {};
    this.falsy = [null, undefined, NaN];
    this.customValidators = customNumberValidators;
  }

  isValid(validatedValue) {
    if (
      typeof validatedValue !== 'number'
      && validatedValue !== undefined
      && validatedValue !== null
    ) {
      throw new Error(`Expected number, but received ${typeof validatedValue}`);
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
    this.checks.required = (validatedValue) => !this.falsy.includes(validatedValue);

    return this;
  }

  positive() {
    this.checks.positive = (validatedValue) => {
      if (this.falsy.includes(validatedValue)) {
        return true;
      }
      return !(validatedValue <= 0);
      // If you want positive method not allow to pass null, 
      // undefind and NaN just use strings below instead of the above ones
      // return this.falsy.includes(validatedValue) ? false : validatedValue > 0;
    };

    return this;
  }

  range(min, max) {
    this.checks.range = (validatedValue) => (this.falsy.includes(validatedValue)
      ? false
      : min <= validatedValue && validatedValue <= max);

    return this;
  }
}
