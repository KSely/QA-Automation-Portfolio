const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return EMAIL_PATTERN.test(email.trim());
}

export function validateContactInput(name, email, message) {
  if (
    !name ||
    !email ||
    !message ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return {
      isValid: false,
      message: "All fields are required."
    };
  }

  if (!isValidEmail(email)) {
    return {
      isValid: false,
      message: "Invalid email address."
    };
  }

  return { isValid: true };
}
