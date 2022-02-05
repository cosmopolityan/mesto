// import { enableValidation } from './index.js';

const enableValidation = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});

export default class FormValidator {

  constructor(enableValidation, formElement) {
    this._inputSelector = enableValidation.inputSelector;
    this._submitButtonSelector = enableValidation.submitButtonSelector;
    this._inactiveButtonClass = enableValidation.inactiveButtonClass;
    this._inputErrorClass = enableValidation.inputErrorClass;
    this._errorClass = enableValidation.errorClass;
    this._formElement = formElement;
  }

  // _setEventListeners = () => {
  //   const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  //   const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  //   this._toggleButtonState(buttonElement);

  //   inputList.forEach((inputElement) => {
  //     inputElement.addEventListener('input', () => {
  //       this._checkInputValidity(inputElement);
  //       this._toggleButtonState(buttonElement);
  //     });
  //   });
  // };

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
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  };

  checkFormValidity = () => {
    // this.inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };


  setAbleButton = (buttonElement) => {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disable = false;
  }

  setDisableButton = (buttonElement) => {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disable = true;
  }

  _toggleButtonState = (buttonElement) => {
    if (this.checkFormValidity()) {
      this.setDisableButton(buttonElement);
    } else {
      this.setAbleButton(buttonElement);
    }
  };

  _setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState (buttonElement);

    inputList.forEach ((inputElement) => {
      inputElement.addEventListener ('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(buttonElement);
      });
    });
  };

  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners;
  };

  clearErrorElements = () => {
    const errorList = Array.from(this._formElement.querySelectorAll('.popup__error'));
    errorList.forEach((error) => {
      error.classList.remove(this._errorClass)
    });

    const errorInputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    errorInputList.forEach((error) => {
      error.classList.remove(this._inputErrorClass)
    });
  }
};
