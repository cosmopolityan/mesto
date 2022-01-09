// Начальный список карточек
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

let photosList = document.querySelector('.elements__list');

let popUpPhotos = document.querySelector('.popup-photo');
let popUpPhotosImage = popUpPhotos.querySelector('.popup-photo__image');
let popUpPhotosCaption = popUpPhotos.querySelector('.popup-photo__caption');
let popUpPhotosCloseButton = popUpPhotos.querySelector('.popup-photo__close-button'); // popup__close-button

function addPhotosElement(name, link, where) {
  const photosElement = document.querySelector('#element-template').content;
  const photosCard = photosElement.cloneNode(true);
  const photosImage = photosCard.querySelector('.element__image');
  const photosLikeButton = photosCard.querySelector('.element__like-button');
  const photosDeleteButton = photosCard.querySelector('.element__trash-button');
  photosCard.querySelector('.element__image').src = link;
  photosCard.querySelector('.element__image').alt = name;
  photosCard.querySelector('.element__title').textContent = name;
  photosImage.addEventListener('click', openPhoto); //
  photosLikeButton.addEventListener('click', likePhoto);
  photosDeleteButton.addEventListener('click', deleteButton);
  where === 'append' ? photosList.append(photosCard) : photosList.prepend(photosCard);
}

//

function initializePhotos(arr) {
  arr.forEach(elem => {
    addPhotosElement(elem.name, elem.link, 'append');
  });
}

initializePhotos(initialCards);

//

let popUpAdd = document.querySelector('#pop2');

function closePopUpAdd() {
  emptyInputValue(inputPhotoName, inputPhotoLink);
  popUpAdd.classList.remove('popup_opened');
}

function emptyInputValue(...inputs) {
  inputs.map(elem => elem.value = '')
}

let addForm = document.querySelector('#pop2');
let inputPhotoName = pop2.querySelector('#photo-name');
let inputPhotoLink = pop2.querySelector('#photo-link');

function addCard(evt) {
  evt.preventDefault();
  addPhotosElement(inputPhotoName.value, inputPhotoLink.value, 'prepend');
  emptyInputValue(inputPhotoName, inputPhotoLink);
  closePopUpAdd()
}

//
let photosLikeButton = photosList.querySelectorAll('.element__like-button');
//photosLikeButton.addEventListener('click', likePhoto);

function likePhoto(evt) {
  evt.target.classList.toggle('element__like-button_active')
}

photosLikeButton.forEach(elem => {
  elem.addEventListener('click', likePhoto);
})

let photosDeleteButton = photosList.querySelectorAll('.element__trash-button');
//photosDeleteButton.addEventListener('click', deleteButton);

function deleteButton(evt) {
  evt.target.closest('.element').remove();
}

let profileElement = document.querySelector('.profile');
// Объявленная переменная = результат поиска секции .profile во всем документе.

let editButton = profileElement.querySelector('.profile__edit-button');
// Объявленная переменная = результат поиска кнопки .profile__edit-button в секции .profile.
let addButton = profileElement.querySelector('.profile__add-button')
// Объявленная переменная = результат поиска кнопки .profile__add-button в секции .profile.

let nameElement = profileElement.querySelector('.profile__name');
// Объявленная переменная = результат поиска поля .profile__name в секции .profile.

let jobElement = profileElement.querySelector('.profile__description');
// Объявленная переменная = результат поиска поля .profile__description в секции .profile.

let popup1Element = document.querySelector('#pop1');
// Объявленная переменная = результат поиска секции с id #pop1 во всем документе.

//06.01.22
let popup2Element = document.querySelector('#pop2');
// Объявленная переменная = результат поиска секции с id #pop2 во всем документе.

const popup1ElementOpen = 'popup_opened';
// Объявленная константа со значением класса, чтобы в дальнейшем передать ее как аргумент в функцию.

const popup2ElementOpen = 'popup_opened';

let close1Button = popup1Element.querySelector('.popup__close-button');
// Объявленная переменная = результат поиска кнопки .popup__close-button в секции .popup.
let form1Element = popup1Element.querySelector('.popup__form');
// Объявленная переменная = результат поиска формы .popup__form в секции .popup.

let close2Button = popup2Element.querySelector('.popup__close-button');
// Объявленная переменная = результат поиска кнопки .popup__close-button в секции .popup.
let form2Element = popup2Element.querySelector('.popup__form');
// Объявленная переменная = результат поиска формы .popup__form в секции .popup.

let nameInput = form1Element.querySelector('.popup__input[name="name"]');
// Объявленная переменная = результат поиска инпута .popup__input с id = name в форме .popup__form.
let jobInput = form1Element.querySelector('.popup__input[name="job"]');
// Объявленная переменная = результат поиска инпута .popup__input с id = job в форме .popup__form.

// let titleInput = formElement.querySelector('.popup__input[name="title"]');
// Объявленная переменная = результат поиска инпута .popup__input с id = title в форме .popup__form.
// let linkInput = formElement.querySelector('.popup__input[name="link"]');
// Объявленная переменная = результат поиска инпута .popup__input с id = link в форме .popup__form.

function popup1Toggle() {
  popup1Element.classList.toggle(popup1ElementOpen);
}
// Функция добавления/удаления класса .popup_opened элементу .popup.

function popup2Toggle() {
  popup2Element.classList.toggle(popup2ElementOpen);
}

function popup1Open() {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
// Без этих 2 строк, попап открывается, но в полях нет значений из DOM, только информация из placeholder'а.
  popup1Toggle(); // '.popup' => '.popup popup_opened'
}
// Функция присваивает полям "вытянутые" из DOM значения в соотв. полях.

function popup2Open() {
  popup2Toggle(); // '.popup' => '.popup popup_opened'
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  popup1Toggle(); // '.popup popup_opened' => '.popup'
}
// Функция "перезаписывает" имеющиеся значения на новые, введенные пользователем.



function openPhoto(evt) {
  let box = evt.path[1];
  let img = box.querySelector('.element__image');
  let caption = box.querySelector('.element__title');
  popUpPhotosImage.src = img.src;
  popUpPhotosCaption.textContent = caption.textContent;
  popUpPhotosCloseButton.addEventListener('click', closePhoto);
  popUpPhotos.classList.add('popup_opened');
}

function closePhoto() {
  popUpPhotos.classList.remove('popup_opened');
}


editButton.addEventListener('click', popup1Open);
// добавленный ивентлиссенер по клику вызывает функцию popupOpen => попап открывается.
addButton.addEventListener('click', popup2Open);
// добавленный ивентлиссенер по клику вызывает функцию popupOpen => попап открывается (Открывается тот же самый попап, что и в editButton)
close1Button.addEventListener('click', popup1Toggle);
// добавленный ивентлиссенер по клику вызывает функцию popupToggle -> '.popup popup_opened' => '.popup'.
close2Button.addEventListener('click', popup2Toggle);
// добавленный ивентлиссенер по клику вызывает функцию popupToggle -> '.popup popup_opened' => '.popup'.
form1Element.addEventListener('submit', formSubmitHandler);
// добавленный ивентлиссенер по клику вызывает функцию formSubmitHandler -> отменяет стандартную отправку формы, устанавливает введенные пользователем значения в соотв. поля, перезаписывает их в DOM после нажатия кнопки 'Сохранить' [submit].

addForm.addEventListener('submit', addCard);
