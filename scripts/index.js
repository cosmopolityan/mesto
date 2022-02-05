//
// Refactoring:
import { enableValidation } from './enableValidation.js';
import { initialCards } from './initialCards.js';
import { photosList, popupAdd, inputPhotoName, inputPhotoLink, popupPhotos, popups, editForm, addForm, submitEditButton, submitAddButton, profileElement, editButton, addButton, nameElement, jobElement, profilePopup, profilePopupCloseButton, /* editProfileForm ,*/ popupAddCloseButton, nameInput, jobInput } from './consts.js';

//

//
import Card from './Card.js';
// import { closePhoto } from './Card.js';
import FormValidator from './FormValidator.js';
// import { enableValidation } from './FormValidator.js';

// Загрузка начальных карточек из массива

initialCards.forEach((item) => {
  const
  const card = new Card(item);
  const cardElement = card.addPhotosElement();
  photosList.append(cardElement);
});

// Добавление новой карточки

function cardSubmit(evt) {
  evt.preventDefault();

  const card = new Card({ name: inputPhotoName.value, link: inputPhotoLink.value });
  const cardElement = card.addPhotosElement(); //

  addValidator.setDisableButton(submitAddButton);
  addValidator.clearErrorElements();

  photosList.prepend(cardElement)

  // const buttonElement = evt.submitter;

  closePopup(popupAdd);
  addForm.reset(); //
}

// Открытие любого попапа

export function openPopup(elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
}

// Закрытие любого попапа (3 способа)

export function closePopup(elem) {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
}

function closeEsc(elem) {
  if (elem.key === "Escape") {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
}

popups.forEach(elem => {
  elem.addEventListener('mousedown', (evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(elem);
    }
  }));
});

// Валидация (не работает)

const editValidator = new FormValidator(enableValidation, profilePopup);
const addValidator = new FormValidator(enableValidation, popupAdd);

editValidator.enableValidation();
addValidator.enableValidation();

//


function openProfilePopup() {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

  // editValidator.setDisableButton();

  openPopup(profilePopup);
}

function closeProfilePopup() {
  closePopup(profilePopup);
}

function openAddPopup() {
  openPopup(popupAdd);
}

function closeAddPopup() {
  closePopup(popupAdd);
}

function changeProfileData(evt) {
  evt.preventDefault();
  // "перезаписываем" имеющиеся значения на новые, введенные пользователем:
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  editValidator.setAbleButton(submitEditButton) //
  editValidator.clearErrorElements();

  closePopup(profilePopup); // '.popup popup_opened' => '.popup'

}

// ************************************************************************************************

editForm.addEventListener('submit', (evt) => {
  // const inputList = Array.from(editForm.querySelectorAll(enableValidation.inputSelector));
  if (!editValidator.checkFormValidity()) {
    changeProfileData(evt);
  }
});

addForm.addEventListener('submit', (evt) => {
  // const inputList = Array.from(addForm.querySelectorAll(enableValidation.inputSelector));
  if (!addValidator.checkFormValidity()) {
    cardSubmit(evt);
  }
});

// ************************************************************************************************

// EventListener'ы

editButton.addEventListener('click', openProfilePopup);
// добавленный ивентлиссенер по клику вызывает функцию popupOpen => попап открывается.
addButton.addEventListener('click', openAddPopup);
// добавленный ивентлиссенер по клику вызывает функцию popupOpen => попап открывается.
profilePopupCloseButton.addEventListener('click', closeProfilePopup);
// добавленный ивентлиссенер по клику вызывает функцию popupToggle -> '.popup popup_opened' => '.popup'.
popupAddCloseButton.addEventListener('click', closeAddPopup);
// добавленный ивентлиссенер по клику вызывает функцию popupToggle -> '.popup popup_opened' => '.popup'.
editForm.addEventListener('submit', changeProfileData);
// добавленный ивентлиссенер по клику вызывает функцию changeProfileData -> отменяет стандартную отправку формы, устанавливает введенные пользователем значения в соотв. поля, перезаписывает их в DOM после нажатия кнопки 'Сохранить' [submit].

// popupPhotosCloseButton.addEventListener('click', closePhoto); //

popupAdd.addEventListener('submit', cardSubmit);
