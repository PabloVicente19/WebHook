import { validateForm } from "./app.js";

const $form = document.querySelector('.contact__form');
const $name = document.getElementById('nombre');
const $email = document.getElementById('email');
const $textarea = document.querySelector('.contact__textarea');


const setFormData = () => {
  const formData = {
    name: $name.value,
    email: $email.value,
    message: $textarea.value
  };
  return formData;
}

const isFormValid = (formData) => {
  const errors = validateForm(formData);
  const hasNoErrors = Object.keys(errors).length === 0;
  return hasNoErrors;
}

const sendToEmail = (e) => {
  e.preventDefault();
  const formData = setFormData();
  const valid = isFormValid(formData);

  if (valid) {
    $form.submit();
  } else {
    console.log('❌ Formulario inválido');
    const errors = validateForm(formData);
    console.log('Errores:', errors);
    alert('Por favor, complete correctamente el formulario.');
  }
}

const init = () => {
  $form.addEventListener('submit', sendToEmail);
}
init();
