import Card from './Card.js';
// import { closePhoto } from './Card.js';
import FormValidator from './FormValidator.js';
// import { enableValidation } from './FormValidator.js';
//

export const enableValidation = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});


// Начальный массив карточек-объектов
const initialCards = [
  {
    name: 'Камчатка',
    link: 'images/kamchatka.jpg'
  },
  {
    name: 'Мурманск',
    link: 'images/murmansk.jpg'
  },
  {
    name: 'Озеро Байкал',
    link: 'images/baikal-lake.jpg'
  },
  {
    name: 'Алтай',
    link: 'images/altay.jpg'
  },
  {
    name: 'Приморский край',
    link: 'images/primorskiy-kray.jpg'
  },
  {
    name: 'Башкирия',
    link: 'images/poperechnaya-gora.jpg'
  }
];

//

const photosList = document.querySelector('.elements__list');

const popupAdd = document.querySelector('#card_popup');
const inputPhotoName = popupAdd.querySelector('#title');
const inputPhotoLink = popupAdd.querySelector('#photo-link');

const popupPhotos = document.querySelector('.popup-photo');
const popups = document.querySelectorAll('.popup');

const addForm = document.querySelector('.popup__form[name="add-card_form"]');

// Загрузка начальных карточек из массива.

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.addPhotosElement();

  photosList.append(cardElement);
});

function cardSubmit(evt){
  evt.preventDefault();

  const card = new Card({name: inputPhotoName.value, link: inputPhotoLink.value});
  const cardElement = card.addPhotosElement(); //

  // addValidator.setDisableButton(evt.submitter);
  // addValidator.clearErrorElements();

  photosList.prepend(cardElement)

  // const buttonElement = evt.submitter;

  closePopup(popupAdd);
  addForm.reset(); //
}
//

// const popupAdd = document.querySelector('#card_popup');

// функция открытия любого попапа

export function openPopup(elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
}

// функция закрытия любого попапа (3 способа)
// рабочий код, но нужно будет переписать более красиво и правильно ***

export function closePopup(elem) {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
}

function closeEsc (elem) {
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

const profileElement = document.querySelector('.profile');
const editButton = profileElement.querySelector('.profile__edit-button');
const addButton = profileElement.querySelector('.profile__add-button');
const nameElement = profileElement.querySelector('.profile__name');
const jobElement = profileElement.querySelector('.profile__description');
const profilePopup = document.querySelector('#profile_popup');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close-button');
const editProfileForm = profilePopup.querySelector('.popup__form');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');
const nameInput = editProfileForm.querySelector('.popup__input[name="name"]');
const jobInput = editProfileForm.querySelector('.popup__input[name="job"]');
const editForm = document.querySelector('.popup__form[name="edit-profile_form"]');

// Валидация (не работает)

const editValidator = new FormValidator (enableValidation, profilePopup);
const addValidator = new FormValidator (enableValidation, popupAdd);

editValidator.enableValidation();
addValidator.enableValidation();

//


function openProfilePopup() {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
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
editProfileForm.addEventListener('submit', changeProfileData);
// добавленный ивентлиссенер по клику вызывает функцию changeProfileData -> отменяет стандартную отправку формы, устанавливает введенные пользователем значения в соотв. поля, перезаписывает их в DOM после нажатия кнопки 'Сохранить' [submit].

// popupPhotosCloseButton.addEventListener('click', closePhoto); //

popupAdd.addEventListener('submit', cardSubmit);
