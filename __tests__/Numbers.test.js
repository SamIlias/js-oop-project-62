import Validator from "../src/Validator.js";

test("Default schema. Passes empty value", () => {
  const v = new Validator();
  const schema = v.number();
  expect(schema.isValid(null)).toBe(true);
  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(NaN)).toBe(true);
});

test("Check method 'required' - Require any number", () => {
  const v = new Validator();
  const schema = v.number();
  schema.required();

  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid(undefined)).toBe(false);
  expect(schema.isValid(NaN)).toBe(false);
  expect(schema.isValid(0)).toBe(true);
  expect(schema.isValid(9)).toBe(true);
});

test("Check method 'positive' - Must be positive", () => {
  const v = new Validator();
  const schema = v.number();

  expect(schema.positive().isValid(9)).toBe(true);
  expect(schema.isValid(0)).toBe(false);
  expect(schema.isValid(-1)).toBe(false);
  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid(undefined)).toBe(false);
  expect(schema.isValid(NaN)).toBe(false);
});

test("Check method 'range' - Must be in range", () => {
  const v = new Validator();
  const schema = v.number();
  schema.range(-5, 5);

  expect(schema.isValid(-3)).toBe(true);
  expect(schema.isValid(5)).toBe(true);
  expect(schema.isValid(0)).toBe(true);
  expect(schema.isValid(9)).toBe(false);
  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid(undefined)).toBe(false);
  expect(schema.isValid(NaN)).toBe(false);
});

test("Check complex", () => {
  const v = new Validator();
  const schema = v.number();
  schema.positive().range(-5, 5);

  expect(schema.isValid(-3)).toBe(false);
  expect(schema.isValid(5)).toBe(true);
  expect(schema.isValid(9)).toBe(false);
  expect(schema.isValid(0)).toBe(false);
  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid(undefined)).toBe(false);
  expect(schema.isValid(NaN)).toBe(false);

  expect(schema.range(1, 10).isValid(9)).toBe(true);
});