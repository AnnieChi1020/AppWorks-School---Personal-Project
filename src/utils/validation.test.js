import { validateEmail } from "./validation.js";
import "@testing-library/jest-dom/extend-expect";

describe("Should tell if the email input passed the validation", () => {
  const mockFunc = jest.fn();

  test("Should return true if the format is correct", () => {
    expect(validateEmail("annie@gmail.com", mockFunc)).toBe(true);
  });

  test("Should return false if the input misses the @ symbol", () => {
    expect(validateEmail("anniegmail.com", mockFunc)).toBe(false);
  });

  test("Should return false if the input misses the prefix", () => {
    expect(validateEmail("@gmail.com", mockFunc)).toBe(false);
  });

  test("Should return false if the input misses the domain", () => {
    expect(validateEmail("annie@", mockFunc)).toBe(false);
  });
});
