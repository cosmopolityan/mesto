// Здравствуйте, Геннадий!
// Большое спасибо за такое оперативное и детальное ревью!
// Постарался все ошибки исправить, насколько понял их. Над моментами "Можно лучше" буду сознательно работать уже потом, пока что первостепенная и самая важная для меня цель - до 16.01.22 закрыть 5 и 6 спринт.

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

const photosList = document.querySelector('.elements__list'); // исправлено с let

let popupPhotos = document.querySelector('.popup-photo');
let popupPhotosImage = popupPhotos.querySelector('.popup-photo__image');
let popupPhotosCaption = popupPhotos.querySelector('.popup-photo__caption');
let popupPhotosCloseButton = popupPhotos.querySelector('.popup__close-button');

function addPhotosElement(name, link, where) {
  const photosElement = document.querySelector('#element-template').content;
  const photosCard = photosElement.cloneNode(true);
  const photosImage = photosCard.querySelector('.element__image');
  const photosLikeButton = photosCard.querySelector('.element__like-button');
  const photosDeleteButton = photosCard.querySelector('.element__trash-button');
  photosImage.src = link;
  photosCard.querySelector('.element__title').textContent = name;
  photosImage.addEventListener('click', openPhoto);
  photosLikeButton.addEventListener('click', likePhoto);
  photosDeleteButton.addEventListener('click', deleteButton);
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

let popupAdd = document.querySelector('#card_popup');

// функция открытия любого попапа

function openPopup(elem) {
  elem.classList.add('popup_opened');
}

//

// функция закрытия любого попапа

function closePopup(elem) {
  elem.classList.remove('popup_opened');
}

//

function emptyInputValue(...inputs) {
  inputs.map(elem => elem.value = '');
}

let inputPhotoName = popupAdd.querySelector('#photo-name');
let inputPhotoLink = popupAdd.querySelector('#photo-link');

function addCard(evt) {
  evt.preventDefault();
  addPhotosElement(inputPhotoName.value, inputPhotoLink.value, 'prepend');
  emptyInputValue(inputPhotoName, inputPhotoLink);
  closePopup(popupAdd);
}

function likePhoto(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

function deleteButton(evt) {
  evt.target.closest('.element').remove();
}

let profileElement = document.querySelector('.profile');
// Объявленная переменная = результат поиска секции .profile во всем документе.

let editButton = profileElement.querySelector('.profile__edit-button');
// Объявленная переменная = результат поиска кнопки .profile__edit-button в секции .profile.
let addButton = profileElement.querySelector('.profile__add-button');
// Объявленная переменная = результат поиска кнопки .profile__add-button в секции .profile.

let nameElement = profileElement.querySelector('.profile__name');
// Объявленная переменная = результат поиска поля .profile__name в секции .profile.

let jobElement = profileElement.querySelector('.profile__description');
// Объявленная переменная = результат поиска поля .profile__description в секции .profile.

let profilePopup = document.querySelector('#profile_popup');
// Объявленная переменная = результат поиска секции с id #profile_popup во всем документе.

let profilePopupCloseButton = profilePopup.querySelector('.popup__close-button');
// Объявленная переменная = результат поиска кнопки .popup__close-button в секции .popup.
let editProfileForm = profilePopup.querySelector('.popup__form');
// Объявленная переменная = результат поиска формы .popup__form в секции .popup.

let popupAddCloseButton = popupAdd.querySelector('.popup__close-button');
// Объявленная переменная = результат поиска кнопки .popup__close-button в секции .popup.

let nameInput = editProfileForm.querySelector('.popup__input[name="name"]');
// Объявленная переменная = результат поиска инпута .popup__input с id = name в форме .popup__form.
let jobInput = editProfileForm.querySelector('.popup__input[name="job"]');
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
  let box = evt.path[1];
  let img = box.querySelector('.element__image');
  let caption = box.querySelector('.element__title');
  popupPhotosImage.src = img.src;
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
