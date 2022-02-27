class Card {

  constructor({ cardData, templateSelector, handleCardClick, handleLikeClick, handleDelClick, userId }) {
    this._templateSelector = document.querySelector('#element-template').content;
    this._name = cardData.name;
    this._link = cardData.link;
    this._ownerId = cardData.owner._id;
    this.likeCounter = cardData.likes.length;
    this.likeArr = cardData.likes;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDelClick = handleDelClick;
    this._userId = userId;
  }

  _getTemplate() {
    this._element = this._templateSelector.querySelector('.element').cloneNode(true);
  }

  // *****
  _renderDelElement = () => {
    if (this._ownerId != this._userId) {
      this._element.querySelector('.element__trash-button').classList.add('element__trash-button_hidden');
    }
  }

  isLiked = () => {
    return this.likeArr.some((element) => {
      return element._id === this._userId;
    });
  };

  _renderLikeElement = () => {
    if (this.isLiked() === true) {
      this.likeCard();
    }
  };

  // *****

  addPhotosElement() {
    this._getTemplate();
    this._element.querySelector('.element__title').textContent = this._name;
    this._image = this._element.querySelector('.element__image');
    this._image.alt = this._name;
    this._image.src = this._link;

    this.elementLikesCount = this._element.querySelector('.element__likecounter');
    this.elementLikesCount.textContent = this.likeCounter;


    this.elementLikesButton = this._element.querySelector('.element__like-button');

    this._renderDelElement();
    this._renderLikeElement();
    this._setEventListeners();

    return this._element;
  }

  likeCard() {
    this.elementLikesButton.classList.toggle('element__like-button_active');;
  }


  deleteCard() {
    this._element.remove();
  }

  countLike() {
    this.elementLikesCount.textContent = this.likeCounter;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector('.element__like-button');
    likeButton.addEventListener('click', () => this._handleLikeClick());

    const deleteButton = this._element.querySelector('.element__trash-button');
    deleteButton.addEventListener('click', () => this._handleDelClick());

    const imageButton = this._element.querySelector('.element__image');
    imageButton.addEventListener('click', () => this._handleCardClick(
      {
        link: this._link,
        name: this._name
      }
    ));
  }
}

export { Card };
