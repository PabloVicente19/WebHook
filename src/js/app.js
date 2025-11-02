const isTextEmpty = (textField) => textField.trim() === '';
const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateForm = (FormData) => {
  const errors = {};

  if (isTextEmpty(FormData.name)) {
    errors.name = 'Name cannot be empty.';
  }
  if (!isEmailValid(FormData.email)) {
    errors.email = 'Invalid email address.';
  }
  if (isTextEmpty(FormData.message)) {
    errors.message = 'Message cannot be empty.';
  }
  return errors;
}