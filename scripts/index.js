// Refactoring:
import { enableValidation } from './enableValidation.js';
import { initialCards } from './initialCards.js';
import { photosList, popupAdd, inputPhotoName, inputPhotoLink, editForm, addForm, submitEditButton, submitAddButton, editButton, addButton, nameElement, jobElement, profilePopup, profilePopupCloseButton, popupAddCloseButton, nameInput, jobInput } from './consts.js';
import { openPopup, closePopup } from './utils.js'
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Валидация

const editValidator = new FormValidator(enableValidation, profilePopup);
const addValidator = new FormValidator(enableValidation, popupAdd);

editValidator.enableValidation();
addValidator.enableValidation();

//

const openAddPopup = () => {
  inputPhotoName.value = '';
  inputPhotoLink.value = '';

  addValidator.setDisableButton(submitAddButton)
  addValidator.clearErrorElements();
  openPopup(popupAdd);
}

const openProfilePopup = () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

  editValidator.setAbleButton(submitEditButton)
  editValidator.clearErrorElements();
  openPopup(profilePopup);
}

const changeProfileData = (evt) => {
  evt.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  closePopup(profilePopup);
}

// **************

const createCard = (obj) => {
  const card = new Card(obj);
  return card.addPhotosElement();
}
// Начальные карточки
initialCards.forEach((item) => {
  const cardElement = createCard(item);
  photosList.append(cardElement);//
});
//

const cardSubmit = (evt) => {
  evt.preventDefault();
  const cardElement = createCard({name: inputPhotoName.value, link: inputPhotoLink.value});
  photosList.prepend(cardElement)
  closePopup(popupAdd);
  addForm.reset();
}

// ***************************************************************

editForm.addEventListener('submit', (evt) => {
  if (!editValidator.checkFormValidity()) {
    changeProfileData(evt);
  }
});

addForm.addEventListener('submit', (evt) => {
  if (!addValidator.checkFormValidity()) {
    cardSubmit(evt);
  }
});

const closeProfilePopup = () => {//
  closePopup(profilePopup);
}

const closeAddPopup = () => {//
  closePopup(popupAdd);
}

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
