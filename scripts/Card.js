import { openPopup } from './utils/utils.js';

const popupPhotos = document.querySelector('.popup-photo');
const popupPhotosImage = popupPhotos.querySelector('.popup-photo__image');
const popupPhotosCaption = popupPhotos.querySelector('.popup-photo__caption');


export default class Card {
  // работает:
  // constructor(enableValidation) {
  //   this._template = document.querySelector('#element-template').content;
  //   this._link = enableValidation.link;
  //   this._name = enableValidation.name;
  // }

  // test #1
  constructor(cardData, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
  }

  // работает:
  // _getTemplate() {
  //   this._element = this._template.querySelector('.element').cloneNode(true);
  // }

  // test #1
    _getTemplate() {
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
      return cardElement;
  }

  // работает:
  // addPhotosElement = () => {
  //   this._getTemplate();
  //   this._setEventListeners();

  //   this._image = this._element.querySelector('.element__image');

  //   this._element.querySelector('.element__title').textContent = this._name;
  //   this._image.alt = this._name;
  //   this._image.src = this._link;

  //   return this._element;
  // }

  // test #1
  addPhotosElement() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__title').textContent = this._name;
    this._image = this._element.querySelector('.element__image');
    this._image.alt = this._name;
    this._image.src = this._link;
    this._setEventListeners();

    return this._element;
  }

  _likePhoto(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }

  _deconsteButton(evt) {
    evt.target.closest('.element').remove();
  }

  _openPhoto(evt) {
    const box = evt.target.closest('.element');
    const img = box.querySelector('.element__image');
    const caption = box.querySelector('.element__title');
    popupPhotosImage.src = img.src;
    popupPhotosImage.alt = img.alt;
    popupPhotosCaption.textContent = caption.textContent;

    openPopup(popupPhotos);
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector('.element__like-button');
    likeButton.addEventListener('click', this._likePhoto);

    const deleteButton = this._element.querySelector('.element__trash-button');
    deleteButton.addEventListener('click', this._deconsteButton);

    const imageButton = this._element.querySelector('.element__image');
    imageButton.addEventListener('click', this._openPhoto);
  }
}
