// changelog 2022-01-14T02:47
// 1. добавлен функционал закрытия попапов по кнопке 'Esc' или по клику на оверлей.


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

const popupPhotos = document.querySelector('.popup-photo');
const popupPhotosImage = popupPhotos.querySelector('.popup-photo__image');
const popupPhotosCaption = popupPhotos.querySelector('.popup-photo__caption');
const popupPhotosCloseButton = popupPhotos.querySelector('.popup__close-button');
const popups = document.querySelectorAll('.popup');

function addPhotosElement(name, link, where) {
  const photosElement = document.querySelector('#element-template').content;
  const photosCard = photosElement.cloneNode(true);
  const photosImage = photosCard.querySelector('.element__image');
  const photosLikeButton = photosCard.querySelector('.element__like-button');
  const photosDeconsteButton = photosCard.querySelector('.element__trash-button');
  photosImage.src = link;
  photosImage.alt = name;
  photosCard.querySelector('.element__title').textContent = name;
  photosImage.addEventListener('click', openPhoto); //
  // Будет лучше, если функция открытия модального окна с картинкой будет принимать название карточки и ссылку вместо события evt.
  // Таким образом, Вам не придется брать данные из события, Вы сможете сразу устанавливать необходимые значения для картинки и заголовка.
  // Для того чтобы передавать аргументы внутри колбэка, Вам следует воспользоваться стрелочной функцией:
  // photosImage.addEventListener('click', () => openPhoto(item));
  // Пока что не понял что openPhoto должен принимать в качестве аргумента (-ов). Все логически возможные варианты выдают в консоли одну и ту же ошибку (not defined). Или нужно переписывать еще саму функцию openPhoto, пока что непонятно.
  photosLikeButton.addEventListener('click', likePhoto);
  photosDeconsteButton.addEventListener('click', deconsteButton);
  where === 'append' ? photosList.append(photosCard) : photosList.prepend(photosCard);
}

// Загрузка начальных карточек из массива.

function initializePhotos(arr) {
  arr.forEach(elem => {
    addPhotosElement(elem.name, elem.link, 'append');
  });
}

initializePhotos(initialCards);

//

const popupAdd = document.querySelector('#card_popup');

// функция открытия любого попапа

function openPopup(elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
}

//

// функция закрытия любого попапа (3 способа)

function closePopup(elem) {
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
  elem.addEventListener('click', (evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(elem);
    }
  }));
});

//

function emptyInputValue(...inputs) {
  inputs.map(elem => elem.value = '');
}

const inputPhotoName = popupAdd.querySelector('#photo-name');
const inputPhotoLink = popupAdd.querySelector('#photo-link');

function addCard(evt) {
  evt.preventDefault();
  addPhotosElement(inputPhotoName.value, inputPhotoLink.value, 'prepend');
  emptyInputValue(inputPhotoName, inputPhotoLink);
  closePopup(popupAdd);
  closeEsc(popupAdd);
}

function likePhoto(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

function deconsteButton(evt) {
  evt.target.closest('.element').remove();
}

const profileElement = document.querySelector('.profile');
// Объявленная переменная = результат поиска секции .profile во всем документе.

const editButton = profileElement.querySelector('.profile__edit-button');
// Объявленная переменная = результат поиска кнопки .profile__edit-button в секции .profile.
const addButton = profileElement.querySelector('.profile__add-button');
// Объявленная переменная = результат поиска кнопки .profile__add-button в секции .profile.

const nameElement = profileElement.querySelector('.profile__name');
// Объявленная переменная = результат поиска поля .profile__name в секции .profile.

const jobElement = profileElement.querySelector('.profile__description');
// Объявленная переменная = результат поиска поля .profile__description в секции .profile.

const profilePopup = document.querySelector('#profile_popup');
// Объявленная переменная = результат поиска секции с id #profile_popup во всем документе.

const profilePopupCloseButton = profilePopup.querySelector('.popup__close-button');
// Объявленная переменная = результат поиска кнопки .popup__close-button в секции .popup.
const editProfileForm = profilePopup.querySelector('.popup__form');
// Объявленная переменная = результат поиска формы .popup__form в секции .popup.

const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');
// Объявленная переменная = результат поиска кнопки .popup__close-button в секции .popup.

const nameInput = editProfileForm.querySelector('.popup__input[name="name"]');
// Объявленная переменная = результат поиска инпута .popup__input с id = name в форме .popup__form.
const jobInput = editProfileForm.querySelector('.popup__input[name="job"]');
// Объявленная переменная = результат поиска инпута .popup__input с id = job в форме .popup__form.

function openProfilePopup() {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
// Без этих 2 строк, попап открывается, но в полях нет значений из DOM, только информация из placeholder'а.
  openPopup(profilePopup); // '.popup' => '.popup popup_opened'
}
// Функция присваивает полям "вытянутые" из DOM значения в соотв. полях.

function closeProfilePopup() {
  closePopup(profilePopup);
}

function openAddPopup() {
  openPopup(popupAdd); // '.popup' => '.popup popup_opened'
}

function closeAddPopup() {
  closePopup(popupAdd); // '.popup' => '.popup popup_opened'
}

function changeProfileData(evt) {
  evt.preventDefault();
  // "перезаписываем" имеющиеся значения на новые, введенные пользователем:
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  closePopup(profilePopup); // '.popup popup_opened' => '.popup'
}

function openPhoto(evt) {
  const box = evt.path[1];
  const img = box.querySelector('.element__image');
  const caption = box.querySelector('.element__title');
  popupPhotosImage.src = img.src;
  popupPhotosImage.alt = img.alt;
  popupPhotosCaption.textContent = caption.textContent;

  openPopup(popupPhotos);
}

function closePhoto() {
  closePopup(popupPhotos);
}

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
popupPhotosCloseButton.addEventListener('click', closePhoto);

popupAdd.addEventListener('submit', addCard);
