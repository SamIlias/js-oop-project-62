import Validator from '../index.js';

test('Default schema. Passes empty value', () => {
  const v = new Validator();
  const schema = v.string();
  expect(schema.isValid('')).toBe(true);
  expect(schema.isValid(null)).toBe(true);
  expect(schema.isValid(undefined)).toBe(true);
});

test('Default schema. Passes not a string', () => {
  const v = new Validator();
  const schema = v.string();
  expect(() => schema.isValid(NaN)).toThrow();
  expect(() => schema.isValid(0)).toThrow();
  expect(() => schema.isValid(999)).toThrow();
  expect(() => schema.isValid({})).toThrow();
  expect(() => schema.isValid([])).toThrow();
});

test('Check method \'required\' - Require not empty string', () => {
  const v = new Validator();
  const schema = v.string();
  schema.required();

  expect(schema.isValid('what does the fox say')).toBe(true);
  expect(schema.isValid('')).toBe(false);
  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid(undefined)).toBe(false);
});

test('Check method \'contains\' - Must contain a substring', () => {
  const v = new Validator();
  const schema = v.string();

  schema.contains('what');
  expect(schema.isValid('what does the fox say')).toBe(true);
  expect(schema.isValid('why does the fox say')).toBe(false);

  schema.contains('why');
  expect(schema.isValid('what does the fox say')).toBe(false);
  expect(schema.isValid('why does the fox say')).toBe(true);

  schema.contains('');
  expect(schema.isValid('why does the fox say')).toBe(true);

  schema.contains(undefined);
  expect(schema.isValid('why does the fox say')).toBe(false);

  schema.contains();
  expect(schema.isValid('why does the fox say')).toBe(false);
});

test('Check method \'minLength\' - Length must be greater than minLength', () => {
  const v = new Validator();
  const schema = v.string();
  schema.minLength(10).minLength(6);

  expect(schema.isValid('Hexlet')).toBe(true);
  expect(schema.isValid('Hex')).toBe(false);

  schema.minLength();
  expect(schema.isValid('Hex')).toBe(true);
});
