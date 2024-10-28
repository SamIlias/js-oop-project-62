import Validator from "../src/Validator.js";

test("Check method 'shape' - all attributes must be satisfied", () => {
  const v = new Validator();
  const schema = v.object();
  schema.shape({
    name: v.string().required(),
    age: v.number().positive(),
  });

  expect(schema.isValid({ name: "kolya", age: 100 })).toBe(true);
  expect(schema.isValid({ name: "maya", age: 2 })).toBe(true);
  // expect(schema.isValid({ name: "maya", age: null})).toBe(true);
  expect(schema.isValid({ name: "", age: null })).toBe(false);
  expect(schema.isValid({ name: "ada", age: -5 })).toBe(false);

  schema.shape({
    name: v.string().required(),
    age: v.number(),
  });

  expect(schema.isValid({ name: "ada", age: -5 })).toBe(true);
});
