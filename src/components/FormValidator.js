export default class FormValidator {

  constructor(enableValidation, formElement) {
    this._inputSelector = enableValidation.inputSelector;
    this._submitButtonSelector = enableValidation.submitButtonSelector;
    this._inactiveButtonClass = enableValidation.inactiveButtonClass;
    this._inputErrorClass = enableValidation.inputErrorClass;
    this._errorClass = enableValidation.errorClass;
    this._formElement = formElement;
    // this._formElement.querySelector(this._submitButtonSelector) = buttonElement;
    // Invalid left-hand side in assignment expression

    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  };

  //  =

  resetValidation() {
    // this._inputList.forEach((inputElement) => this._hideInputError(inputElement) //<==очищаем ошибки ==
    // );
    this._inputList.forEach((inputElement) => this.hideInputError(inputElement) //<==очищаем ошибки ==
    );
    this._toggleButtonState(); //<== управляем кнопкой ==
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.popup__error_type_${inputElement.id}`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  // _hideInputError = (inputElement) => {
  hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.popup__error_type_${inputElement.id}`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);

    // const errorList = Array.from(this._formElement.querySelectorAll('.popup__error'));
    // errorList.forEach((error) => {
    //   error.classList.remove(this._errorClass)
    // });

    // const errorInputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    // errorInputList.forEach((error) => {
    //   error.classList.remove(this._inputErrorClass)
    // });
  };

  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      // this._hideInputError(inputElement);
      this.hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  };

  checkFormValidity = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // setAbleButton = (buttonElement) => {
  //   buttonElement.classList.remove(this._inactiveButtonClass);
  //   buttonElement.disable = false;
  // }

  // setDisableButton = (buttonElement) => {
  //   buttonElement.classList.add(this._inactiveButtonClass);
  //   buttonElement.disable = true;
  // }

  setAbleButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disable = false;
  }

  setDisableButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disable = true;
  }

  // _toggleButtonState = (buttonElement) => {
  //   if (this.checkFormValidity()) {
  //     this.setDisableButton(buttonElement);
  //   } else {
  //     this.setAbleButton(buttonElement);
  //   }
  // };


  _toggleButtonState = () => { //
    // если я не передаю buttonElement здесь, у меня сразу все карточки не грузятся с ошибкой:
    // createCard is not a function
    if (this.checkFormValidity()) {
      this.setDisableButton();
    } else {
      this.setAbleButton();
    }
  };

  _setEventListeners = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    //const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    // если я не декларирую buttonElement в EventListener'ах, у меня сразу все карточки не грузятся с ошибкой:
    // createCard is not a function

    // this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    // this._element.addEventListener('.popup__close-button', this.resetValidation);


    //
    // this._toggleButtonState(buttonElement);

    // this._inputList.forEach((inputElement) => {
    //   inputElement.addEventListener('input', () => {
    //     this._checkInputValidity(inputElement);
    //     this._toggleButtonState(buttonElement);
    //   });
    //

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
};
