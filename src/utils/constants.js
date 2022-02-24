// import kamchatka from '../../images/kamchatka.jpg';
// import murmansk from '../../images/murmansk.jpg';
// import baikal from '../../images/baikal-lake.jpg';
// import altay from '../../images/altay.jpg';
// import primorskiy from '../../images/primorskiy-kray.jpg';
// import bashkiriya from '../../images/poperechnaya-gora.jpg';

// const initialCards = [
//   {
//     name: 'Камчатка',
//     link: kamchatka
//   },
//   {
//     name: 'Мурманск',
//     link: murmansk
//   },
//   {
//     name: 'Озеро Байкал',
//     link: baikal
//   },
//   {
//     name: 'Алтай',
//     link: altay
//   },
//   {
//     name: 'Приморский край',
//     link: primorskiy
//   },
//   {
//     name: 'Башкирия',
//     link: bashkiriya
//   }
// ];

const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const photosList = document.querySelector('.elements__list'); // изначально пустой <ul class="elements__list">

const popupAdd = document.querySelector('#card_popup'); // попап добавления карточки
const inputPhotoName = popupAdd.querySelector('#title'); // input "Название"
const inputPhotoLink = popupAdd.querySelector('#photo-link'); // input "Ссылка на картинку"

const popupPhotos = document.querySelector('.popup-photo'); // попап для открытия картинки (full)
const popupPhotosImage = popupPhotos.querySelector('.popup-photo__image');
const popupPhotosCaption = popupPhotos.querySelector('.popup-photo__caption');
const popups = document.querySelectorAll('.popup'); // все попапы с классом .popup

const editForm = document.querySelector('.popup__form[name="edit-profile_form"]'); // форма редактирования профиля ("edit-profile_form") внутри попапа.
const addForm = document.querySelector('.popup__form[name="add-card_form"]'); // форма добавления карточки ("add-card_form") внутри попапа.
const avatarBlock = document.querySelector('.profile__avatar-block');

const submitEditButton = editForm.querySelector('#edit-profile-save-button'); // кнопка "Сохранить" в форме редактирования профиля
const submitAddButton = addForm.querySelector('#add-card-button'); // кнопка "Создать" в форме добавления карточки

const profileElement = document.querySelector('.profile'); // секция профиля с аватаром, описанием, 2-мя кнопками: "🖊️"(Редактировать профиль) и "➕" (Добавить новую карточку)
const editButton = profileElement.querySelector('.profile__edit-button'); // кнопка "🖊️"
const addButton = profileElement.querySelector('.profile__add-button'); // кнопка "➕"
const nameElement = profileElement.querySelector('.profile__name'); // Имя владельца профиля (default = Жак-Ив Кусто)
const jobElement = profileElement.querySelector('.profile__description'); // Профессия владельца профиля (default = Исследователь океана)
const profilePopup = document.querySelector('#profile_popup'); // попап редактирования профиля
const profilePopupCloseButton = profilePopup.querySelector('.popup__close-button'); // кнопка закрытия попапа редактирования профиля

const avatarPopup = document.querySelector('#confirm-edit-profile-avatar_popup'); // попап редактирования аватара профиля
const avatarPopupCloseButton = avatarPopup.querySelector('.popup__close-button'); // кнопка закрытия попапа редактирования профиля

const submitDelButton = addForm.querySelector('#delete-card-button');

const formElementAvatar = document.querySelector('.popup__form[name="edit-avatar"]');
const submitAvatarButton = formElementAvatar.querySelector('#edit-profile-avatar-button');


const popupAddCloseButton = popupAdd.querySelector('.popup__close-button'); // кнопка закрытия попапа добавления карточки
const popupPhotosCloseButton = popupPhotos.querySelector('.popup__close-button'); // кнопка закрытия попапа открытой фотографии
const nameInput = editForm.querySelector('.popup__input[name="name"]'); // поле инпута (Имя) в форме редактирования профиля
const jobInput = editForm.querySelector('.popup__input[name="job"]'); // поле инпута (Профессия) в форме редактирования профиля

export { /* initialCards, */ enableValidation, photosList, popupAdd, inputPhotoName, inputPhotoLink, popupPhotos, popupPhotosImage, popupPhotosCaption, popups, editForm, addForm, avatarBlock, submitEditButton, submitAddButton, profileElement, editButton, addButton, nameElement, jobElement, profilePopup, profilePopupCloseButton, popupAddCloseButton, popupPhotosCloseButton, nameInput, jobInput, avatarPopup, avatarPopupCloseButton, submitDelButton, formElementAvatar, submitAvatarButton };
