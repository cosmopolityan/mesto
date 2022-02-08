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
const popups = document.querySelectorAll('.popup'); // все попапы с классом .popup

const editForm = document.querySelector('.popup__form[name="edit-profile_form"]'); // форма редактирования профиля ("edit-profile_form") внутри попапа.
const addForm = document.querySelector('.popup__form[name="add-card_form"]'); // форма добавления карточки ("add-card_form") внутри попапа.

const submitEditButton = editForm.querySelector('#edit-profile-save-button'); // кнопка "Сохранить" в форме редактирования профиля
const submitAddButton = addForm.querySelector('#add-card-button'); // кнопка "Создать" в форме добавления карточки

const profileElement = document.querySelector('.profile'); // секция профиля с аватаром, описанием, 2-мя кнопками: "🖊️"(Редактировать профиль) и "➕" (Добавить новую карточку)
const editButton = profileElement.querySelector('.profile__edit-button'); // кнопка "🖊️"
const addButton = profileElement.querySelector('.profile__add-button'); // кнопка "➕"
const nameElement = profileElement.querySelector('.profile__name'); // Имя владельца профиля (default = Жак-Ив Кусто)
const jobElement = profileElement.querySelector('.profile__description'); // Профессия владельца профиля (default = Исследователь океана)
const profilePopup = document.querySelector('#profile_popup'); // попап редактирования профиля
const profilePopupCloseButton = profilePopup.querySelector('.popup__close-button'); // кнопка закрытия попапа редактирования профиля
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button'); // кнопка закрытия попапа добавления карточки
const popupPhotosCloseButton = popupPhotos.querySelector('.popup__close-button'); // кнопка закрытия попапа открытой фотографии
const nameInput = editForm.querySelector('.popup__input[name="name"]'); // поле инпута (Имя) в форме редактирования профиля
const jobInput = editForm.querySelector('.popup__input[name="job"]'); // поле инпута (Профессия) в форме редактирования профиля


export { initialCards, enableValidation, photosList, popupAdd, inputPhotoName, inputPhotoLink, popupPhotos, popups, editForm, addForm, submitEditButton, submitAddButton, profileElement, editButton, addButton, nameElement, jobElement, profilePopup, profilePopupCloseButton, popupAddCloseButton, popupPhotosCloseButton, nameInput, jobInput };
