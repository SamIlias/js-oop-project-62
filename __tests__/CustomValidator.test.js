import Validator from "../src/Validator.js";

test("Custom validator - String, startWith function", () => {
  const v = new Validator();
  fn = (value, start) => value.startsWith(start);
  v.addValidator("string", "startWith", fn);

  const schema = v.string().test("startWith", "H");
  expect(schema.isValid("exlet")).toBe(false);
  expect(schema.isValid("Hexlet")).toBe(true);
});

test("Custom validator - Number, min function", () => {
  const v = new Validator();
  const fn = (value, min) => value >= min;
  v.addValidator("number", "min", fn);

  const schema = v.number().test("min", 5);
  expect(schema.isValid(4)).toBe(false);
  expect(schema.isValid(6)).toBe(true);

  const fn2 = (value, min, max) => value >= min && value <= max;
  v.addValidator("number", "inRange", fn2);

  const schema2 = v.number().test("inRange", 5, 10);
  expect(schema2.isValid(4)).toBe(false);
  expect(schema2.isValid(6)).toBe(true);
  expect(schema2.isValid(11)).toBe(false);
});
