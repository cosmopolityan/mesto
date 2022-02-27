import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(popupSelector){
    super(popupSelector)
    this._popupPhotosImage = this._popup.querySelector('.popup-photo__image');
    this._popupPhotosCaption = this._popup.querySelector('.popup-photo__caption');
  }


  open ({ link, name }) {
    this._popupPhotosImage.src = link;
    this._popupPhotosImage.alt = name;
    this._popupPhotosCaption.textContent = name;

    super.open();
  }
}
