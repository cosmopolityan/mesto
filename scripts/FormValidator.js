// Создайте класс FormValidator, который настраивает валидацию полей формы + :
// принимает в конструктор объект настроек с селекторами и классами формы + ;
// принимает вторым параметром элемент той формы, которая валидируется + ;
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет публичный метод enableValidation, который включает валидацию формы.
// Для каждой проверяемой формы создайте экземпляр класса FormValidator.

// export const enableValidation = ({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible',
// });

export default class FormValidator {

  constructor (enableValidation, formElement) {
    this._inputSelector = enableValidation.inputSelector;
    this._submitButtonSelector = enableValidation.submitButtonSelector;
    this._inactiveButtonClass = enableValidation.inactiveButtonClass;
    this._inputErrorClass = enableValidation.inputErrorClass;
    this._errorClass = enableValidation.errorClass;
    this._formElement = formElement;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.popup__error_type_${inputElement.id}`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.popup__error_type_${inputElement.id}`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };

  _checkInputValidity = (inputElement) => {
    if(inputElement.validity.valid) {
      this._hideInputError (inputElement);
    } else {
      this._showInputError (inputElement, inputElement.validationMessage);
    }
  };

  checkFormValidity = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = (buttonElement) => {
    if (checkFormValidity (inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState (inputList, buttonElement);
    inputList.forEach ((inputElement) => {
      inputElement.addEventListener ('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation = () => {
    this._formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
        });
      this._setEventListeners;
  };
};
