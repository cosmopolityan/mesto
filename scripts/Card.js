// Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
// принимает в конструктор её данные и селектор её template-элемента;
// содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
// Для каждой карточки создайте экземпляр класса Card.
import { openPopup } from './index.js';
import { closePopup } from './index.js';

const popupAdd = document.querySelector('#card_popup');
const inputPhotoName = popupAdd.querySelector('#title'); //
const inputPhotoLink = popupAdd.querySelector('#photo-link'); //
const popupPhotos = document.querySelector('.popup-photo');
const popupPhotosImage = popupPhotos.querySelector('.popup-photo__image');
const popupPhotosCaption = popupPhotos.querySelector('.popup-photo__caption');


export default class Card {

  constructor (enableValidation) {
    this._template = document.querySelector('#element-template').content;
    this._link = enableValidation.link;
    this._name = enableValidation.name;
  }

  _emptyInputValue(...inputs) {
    inputs.map(elem => elem.value = '');
  }

  _getTemplate () {
    this._element = this._template.querySelector('.element').cloneNode(true);
  }

  addPhotosElement = () => {
    this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__image').src = this._link;

    return this._element;
  }

  // _addCard(evt) {
  //   evt.preventDefault();
  //   // addPhotosElement(inputPhotoName.value, inputPhotoLink.value, 'prepend');
  //   // Uncaught ReferenceError: addPhotosElement is not defined
  //   _emptyInputValue(inputPhotoName, inputPhotoLink);
  //   closePopup(popupAdd);
  //   closeEsc(popupAdd);
  //   const buttonElement = evt.submitter;
  //   buttonElement.classList.add('popup__button_disabled');
  //   buttonElement.setAttribute('disabled', true);
  // }

  _likePhoto(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }

  _deconsteButton(evt) {
    evt.target.closest('.element').remove();
  }

  _openPhoto(evt) {
    const box = evt.path[1];
    const img = box.querySelector('.element__image');
    const caption = box.querySelector('.element__title');
    popupPhotosImage.src = img.src;
    popupPhotosImage.alt = img.alt;
    popupPhotosCaption.textContent = caption.textContent;

    openPopup(popupPhotos);
  }

  _closePhoto() {
    closePopup(popupPhotos);
  }

  _setEventListeners () {
    const likeButton = this._element.querySelector('.element__like-button');
    likeButton.addEventListener('click', this._likePhoto);

    const deleteButton = this._element.querySelector('.element__trash-button');
    deleteButton.addEventListener('click', this._deconsteButton);

    const imageButton = this._element.querySelector('.element__image');
    imageButton.addEventListener('click', this._openPhoto);

    const popupPhotosCloseButton = popupPhotos.querySelector('.popup__close-button');
    popupPhotosCloseButton.addEventListener('click', this._closePhoto);

    const popupAdd = document.querySelector('#card_popup');
    popupAdd.addEventListener('submit', this.addPhotosElement);
  }
}









