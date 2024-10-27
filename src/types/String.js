export default class String {
  constructor() {
    this.schema = {};
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
    for (const validFn of Object.values(this.schema)) {
      result = result && validFn(validatedValue);
    }

    return result;
  }

  required() {
    this.schema.required = (validatedValue) => {
      return validatedValue ? true : false;
    };

    return this;
  }

  contains(substring) {
    this.schema.contains = (validatedValue) => {
      return validatedValue.includes(substring);
    };

    return this;
  }

  minLength(num = 1) {
    this.schema.minLength = (validatedValue) => {
      return validatedValue.length >= num;
    };

    return this;
  }
}
