import Validator from "../src/Validator.js";

test("Default schema. Passes empty value", () => {
  const v = new Validator();
  const schema = v.array();
  expect(schema.isValid(null)).toBe(true);
  expect(schema.isValid(undefined)).toBe(true);
});

test("Default schema. Passes not an array", () => {
  const v = new Validator();
  const schema = v.array();
  expect(() => schema.isValid("")).toThrow();
  expect(() => schema.isValid(999)).toThrow();
  expect(() => schema.isValid({})).toThrow();
  expect(() => schema.isValid(0)).toThrow();
  expect(() => schema.isValid(NaN)).toThrow();
});

test("Check method 'required' - Require array", () => {
  const v = new Validator();
  const schema = v.array();
  schema.required();

  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid(undefined)).toBe(false);
  expect(schema.isValid([])).toBe(true);
  expect(schema.isValid([{}])).toBe(true);
  expect(schema.isValid([1, 2, 4])).toBe(true);
});

test("Check method 'sizeof' - Sets required size of an array", () => {
  const v = new Validator();
  const schema = v.array();
  schema.sizeof(2);

  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid(undefined)).toBe(false);
  expect(schema.isValid([])).toBe(false);
  expect(schema.isValid([{}, 1])).toBe(true);
  expect(schema.isValid([1, []])).toBe(true);
  expect(schema.isValid([1, [], {}])).toBe(false);

  schema.sizeof(3);
  expect(schema.isValid([1, [], {}])).toBe(true);
  expect(schema.isValid([1, []])).toBe(false);
});
