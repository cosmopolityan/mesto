// Refactoring:
import { initialCards, enableValidation, photosList, popupAdd, inputPhotoName, inputPhotoLink, popupPhotos, editForm, addForm, submitEditButton, submitAddButton, editButton, addButton, nameElement, jobElement, profilePopup, profilePopupCloseButton, popupAddCloseButton, popupPhotosCloseButton, nameInput, jobInput } from './utils/constants.js';
import { openPopup, closePopup } from './utils/utils.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Валидация
// пока не понял как сделать, чтобы <p class="popup__error> удалялся, при закрытии заполненной с ошибками формы и повторном ее открытии.

const editValidator = new FormValidator(enableValidation, profilePopup);
const addValidator = new FormValidator(enableValidation, popupAdd);
// const editValidatorEmpty = new FormValidator(enableValidation, profilePopup);
// const addValidatorEmpty = new FormValidator(enableValidation, popupAdd);

editValidator.enableValidation();
addValidator.enableValidation();

//

const openAddPopup = () => {
  inputPhotoName.value = '';
  inputPhotoLink.value = '';

  addValidator.setDisableButton(submitAddButton);
  addValidator.clearErrorElements();
  openPopup(popupAdd);
  // resetValidation();
};

const openProfilePopup = () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

  editValidator.setAbleButton(submitEditButton);
  editValidator.clearErrorElements();
  openPopup(profilePopup);
  //resetValidation();
};

const changeProfileData = (evt) => {
  evt.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  closePopup(profilePopup);
};

// **************

// const createCard = (obj) => {
//   const card = new Card(obj);
//   return card.addPhotosElement();
// };

//test #1
function createCard (item) {
  const card = new Card(item, '#element-template');
  return card.addPhotosElement();
};

// Начальные карточки
initialCards.forEach((item) => {
  photosList.append(createCard(item));//
});
//

const submitCard = (evt) => {
  evt.preventDefault();
  const cardElement = createCard({name: inputPhotoName.value, link: inputPhotoLink.value});
  photosList.prepend(cardElement);
  closePopup(popupAdd);
  addForm.reset();
};

// ***************************************************************

editForm.addEventListener('submit', (evt) => {
  if (!editValidator.checkFormValidity()) {
    changeProfileData(evt);
  };
});

addForm.addEventListener('submit', (evt) => {
  if (!addValidator.checkFormValidity()) {
    submitCard(evt);
  }
});

const closeProfilePopup = () => {
  closePopup(profilePopup);
};

const closeAddPopup = () => {
  closePopup(popupAdd);
};

const closePhoto = () => { //
  closePopup(popupPhotos);
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
popupPhotosCloseButton.addEventListener('click', closePhoto); //





