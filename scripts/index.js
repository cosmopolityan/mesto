import Card from './Card.js';
// import { closePhoto } from './Card.js';
import FormValidator from './FormValidator.js';
// import { enableValidation } from './FormValidator.js';
//

const enableValidation = ({
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
// const popupPhotosImage = popupPhotos.querySelector('.popup-photo__image');
// const popupPhotosCaption = popupPhotos.querySelector('.popup-photo__caption');
// const popupPhotosCloseButton = popupPhotos.querySelector('.popup__close-button');
const popups = document.querySelectorAll('.popup');

const addForm = document.querySelector('.popup__form[name="add-card_form"]');
// const buttonElement = addForm.querySelector('.popup__button');
// не ищем кнопку, работаем с evt.submitter прямо в функции addCard(evt).

// function addPhotosElement(name, link, where) {
//   const photosElement = document.querySelector('#element-template').content;
//   const photosCard = photosElement.cloneNode(true);
//   const photosImage = photosCard.querySelector('.element__image');
//   const photosLikeButton = photosCard.querySelector('.element__like-button');
//   const photosDeconsteButton = photosCard.querySelector('.element__trash-button');
//   photosImage.src = link;
//   photosImage.alt = name;
//   photosCard.querySelector('.element__title').textContent = name;
//   photosImage.addEventListener('click', openPhoto); //
//   // Будет лучше, если функция открытия модального окна с картинкой будет принимать название карточки и ссылку вместо события evt.
//   // Таким образом, Вам не придется брать данные из события, Вы сможете сразу устанавливать необходимые значения для картинки и заголовка.
//   // Для того чтобы передавать аргументы внутри колбэка, Вам следует воспользоваться стрелочной функцией:
//   // photosImage.addEventListener('click', () => openPhoto(item));
//   // Пока что не понял что openPhoto должен принимать в качестве аргумента (-ов). Все логически возможные варианты выдают в консоли одну и ту же ошибку (not defined). Или нужно переписывать еще саму функцию openPhoto, пока что непонятно.
//   photosLikeButton.addEventListener('click', likePhoto);
//   photosDeconsteButton.addEventListener('click', deconsteButton);
//   where === 'append' ? photosList.append(photosCard) : photosList.prepend(photosCard);
// }

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

  photosList.prepend(cardElement)

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

//

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

// ***

// Разобраться как написать общую функцию для закрытия всех попапов 3 способами, без поисков каждой кнопки закрытия (общий класс = popup__close-button) в каждом существующем на данный момент и создаваемом в будущем попапе (общий класс = popup).

// function closePopup() {
//   popups.forEach((popup) => {
//     popup.addEventListener('mousedown', (evt) => {
//         if (evt.target.classList.contains('popup_opened')) {
//             closePopup(popup)
//         }
//         if (evt.target.classList.contains('popup__close')) {
//           closePopup(popup)
//         }
//     })
//   })
// };

//

// function emptyInputValue(...inputs) {
//   inputs.map(elem => elem.value = '');
// }

// const inputPhotoName = popupAdd.querySelector('#title');
// const inputPhotoLink = popupAdd.querySelector('#photo-link');

// function addCard(evt) {
//   evt.preventDefault();
//   addPhotosElement(inputPhotoName.value, inputPhotoLink.value, 'prepend'); //
//   // Uncaught ReferenceError: addPhotosElement is not defined
//   emptyInputValue(inputPhotoName, inputPhotoLink);
//   closePopup(popupAdd);
//   closeEsc(popupAdd);
//   const buttonElement = evt.submitter;
//   buttonElement.classList.add('popup__button_disabled');
//   buttonElement.setAttribute('disabled', true);
// }

// function likePhoto(evt) {
//   evt.target.classList.toggle('element__like-button_active');
// }

// function deconsteButton(evt) {
//   evt.target.closest('.element').remove();
// }

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

const EditValidator = new FormValidator (enableValidation, profilePopup);
const AddValidator = new FormValidator (enableValidation, popupAdd);

EditValidator.enableValidation()
AddValidator.enableValidation();

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
  //
  // Код для того, чтобы после записи в DOM новых данных, после нажатия "Редактировать", кнопка "Сохранить" была неактивна:
  // const editForm = document.querySelector('.popup__form[name="edit-profile_form"]');
  // const buttonElement = editForm.querySelector('.popup__button');
  // buttonElement.classList.add('popup__button_disabled');
  // buttonElement.setAttribute('disabled', true);
  //
}

// function openPhoto(evt) {
//   const box = evt.path[1];
//   const img = box.querySelector('.element__image');
//   const caption = box.querySelector('.element__title');
//   popupPhotosImage.src = img.src;
//   popupPhotosImage.alt = img.alt;
//   popupPhotosCaption.textContent = caption.textContent;

//   openPopup(popupPhotos);
// }

// function closePhoto() {
//   closePopup(popupPhotos);
// }


// ************************************************************************************************


// editForm.addEventListener('submit', (evt) => {
//   const inputList = Array.from(editForm.querySelectorAll(enableValidation.inputSelector));
//   if (!EditValidator.checkFormValidity (inputList)) {
//     changeProfileData(evt);
//   }
//   });

// addForm.addEventListener('submit', (evt) => {
//   const inputList = Array.from(addForm.querySelectorAll(enableValidation.inputSelector));
//   if (!AddValidator.checkFormValidity (inputList)) {
//     cardSubmit(evt);
//   }
//   });

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
