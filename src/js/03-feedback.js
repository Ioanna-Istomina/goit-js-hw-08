import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');

//Ключ для сховища
const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(onTextInput, 500));
form.addEventListener('submit', resetForm);

//Об'єкт даних з форми
const formData = {};

populateInput();

//Функція при якій записується значення форми в сховище
function onTextInput(ev) {
  const { name, value } = ev.target;
  formData[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

//Функція для отримання значення форми зі сховища
function populateInput() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    email.value = savedMessage.email;
    message.value = savedMessage.message;
  }
}

// Функція для очищення форми та сховища при submit
function resetForm(ev) {
  //виводить в консоль обьект з email та message
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  ev.preventDefault();
  ev.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
