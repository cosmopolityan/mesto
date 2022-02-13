const popupPhotos = document.querySelector('.popup-photo');
const popupPhotosImage = popupPhotos.querySelector('.popup-photo__image');
const popupPhotosCaption = popupPhotos.querySelector('.popup-photo__caption');


class Card {

  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  };

  addPhotosElement() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__title').textContent = this._name;
    this._image = this._element.querySelector('.element__image');
    this._image.alt = this._name;
    this._image.src = this._link;
    this._setEventListeners();

    return this._element;
  };

  _likePhoto(evt) {
    evt.target.classList.toggle('element__like-button_active');
  };


  _deconsteButton(evt) {
    evt.target.closest('.element').remove();
  };

  _setEventListeners() {
    const likeButton = this._element.querySelector('.element__like-button');
    likeButton.addEventListener('click', this._likePhoto);

    const deleteButton = this._element.querySelector('.element__trash-button');
    deleteButton.addEventListener('click', this._deconsteButton);

    const imageButton = this._element.querySelector('.element__image');
    // imageButton.addEventListener('click', this._openPhoto);
    imageButton.addEventListener('click', () => this._handleCardClick(
      {
        link: this._link,
        name: this._name
      }
    ))
  };

}

export { Card, popupPhotosImage, popupPhotosCaption };
