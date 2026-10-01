import {
  isValidEmail,
  validateContactInput
} from "../../utils/contactValidation.js";

describe("isValidEmail", () => {
  test("accepts a normally formatted email address", () => {
    expect(isValidEmail("test.test@example.com")).toBe(true);
  });

  test("rejects an email address without an at sign", () => {
    expect(isValidEmail("testexample.com")).toBe(false);
  });

  test("rejects an email address with an incomplete domain", () => {
    expect(isValidEmail("test@example")).toBe(false);
  });

  test("rejects an email address without a local part", () => {
    expect(isValidEmail("@example.com")).toBe(false);
  });

  test("accepts surrounding whitespace around an otherwise valid email", () => {
    expect(isValidEmail("  test.test@example.com  ")).toBe(true);
  });
});

describe("validateContactInput", () => {
  test("accepts complete valid contact input", () => {
    expect(
      validateContactInput(
        "Test Tester",
        "test.test@example.com",
        "Please contact me."
      )
    ).toEqual({ isValid: true });
  });

  test("rejects an empty name", () => {
    expect(
      validateContactInput("", "test.test@example.com", "Please contact me.")
    ).toEqual({
      isValid: false,
      message: "All fields are required."
    });
  });

  test("rejects a whitespace-only name", () => {
    expect(
      validateContactInput("   ", "test.test@example.com", "Please contact me.")
    ).toEqual({
      isValid: false,
      message: "All fields are required."
    });
  });

  test("rejects an empty email", () => {
    expect(validateContactInput("Test Tester", "", "Please contact me.")).toEqual(
      {
        isValid: false,
        message: "All fields are required."
      }
    );
  });

  test("rejects a whitespace-only email", () => {
    expect(
      validateContactInput("Test Tester", "   ", "Please contact me.")
    ).toEqual({
      isValid: false,
      message: "All fields are required."
    });
  });

  test("rejects an empty message", () => {
    expect(
      validateContactInput("Test Tester", "test.test@example.com", "")
    ).toEqual({
      isValid: false,
      message: "All fields are required."
    });
  });

  test("rejects a whitespace-only message", () => {
    expect(
      validateContactInput("Test Tester", "test.test@example.com", "   ")
    ).toEqual({
      isValid: false,
      message: "All fields are required."
    });
  });

  test("rejects input when all fields are empty", () => {
    expect(validateContactInput("", "", "")).toEqual({
      isValid: false,
      message: "All fields are required."
    });
  });

  test("returns the required-field error when a required field is empty", () => {
    expect(
      validateContactInput("", "not-an-email", "Please contact me.")
    ).toEqual({
      isValid: false,
      message: "All fields are required."
    });
  });

  test("returns the invalid-email error when the email format is invalid", () => {
    expect(
      validateContactInput("Kate Tester", "not-an-email", "Please contact me.")
    ).toEqual({
      isValid: false,
      message: "Invalid email address."
    });
  });
});
