// Доброго времени суток, дорогой ревьюер!
// Код не работает, я не понимаю почему.
//
// Я уже вконец отчаялся, я не понимаю почему errorElement'у не присваивается errorMessage, а выдает ошибку, хотя вроде бы все логично... По отдельности (просто querySelector(`.popup__error или popup__error_type_name) валидация прикрепляется к выбранному классу, а в функции это почему-то не получается реализовать, падает одна и та же ошибка. Очевидно, что можно под каждый инпут написать свои функции, просто чтобы оно хоть как-то работало, но это будет супер-неправильно и плохо.
// Перечитал весь StackOverflow по этой ошибке, но там бОльшая часть комментатариев про то, что ошибка связана с отсутствуем класса в HTML, но это явно не мой случай у меня все есть, тогда почему не происходит связки, я теряюсь в догадках. Может еще какие-то классы надо присвоить всем полям...
// Наверняка я чего-то супер-очевидного не вижу... Поэтому прошу о помощи, хотя бы о небольшой подсказке, если можно...

const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage; // Uncaught TypeError: Cannot set properties of null (setting 'textContent').
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = ''; // Uncaught TypeError: Cannot set properties of null (setting 'textContent').
  errorElement.classList.remove(errorClass);
};

const checkInputValidity = (formElement, inputElement, {...rest}) => {
  if(inputElement.validity.valid) {
    hideInputError (formElement, inputElement, rest);
  } else {
    showInputError (formElement, inputElement, inputElement.validationMessage, rest);
  }
};

const checkFormValidity = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
  if (checkFormValidity (inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState (inputList, buttonElement, rest);
  inputList.forEach ((inputElement) => {
    inputElement.addEventListener ('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};

const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      });
    setEventListeners (formElement, rest);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});
