// Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
// принимает в конструктор её данные и селектор её template-элемента;
// содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
// Для каждой карточки создайте экземпляр класса Card.

const popupAdd = document.querySelector('#card_popup');
const inputPhotoName = popupAdd.querySelector('#title');
const inputPhotoLink = popupAdd.querySelector('#photo-link');

export default class Card {

  constructor (enableValidation) {
    this.template = document.querySelector('#element-template').content;;
    this.link = enableValidation.link;
    this.name = enableValidation.name;
  }

  _getTemplate () {
    this._element = this._template.querySelector('.element').cloneNode(true);
  }

  addPhotosElement = () => {
    this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

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

  _setEventListeners () {
    const likeButton = this._element.querySelector('.element__like-button');
	  likeButton.addEventListener('click', this._likePhoto);

    const deleteButton = this._element.querySelector('.element__trash-button');
    deleteButton.addEventListener('click', this._deconsteButton);

    const imageButton = this._element.querySelector('.element__image');
    imageButton.addEventListener('click', this._openPhoto);
  }
}







