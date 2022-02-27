import Popup from './Popup.js';
// import { popupPhotosImage, popupPhotosCaption } from '../utils/constants.js';

export default class PopupWithImage extends Popup {

  constructor(popupSelector){
    super(popupSelector)
    this._popupPhotosImage = this._popup.querySelector('.popup-photo__image');
    this._popupPhotosCaption = this._popup.querySelector('.popup-photo__caption');
  }


  open ({ link, name }) {
    // const popupPhotosImage = document.querySelector('.popup-photo__image');
    // const popupPhotosCaption = document.querySelector('.popup-photo__caption');
    // popupPhotosImage.src = link; // Uncaught ReferenceError: popupPhotosImage is not defined
    // popupPhotosImage.alt = name;
    // popupPhotosCaption.textContent = name;

    this._popupPhotosImage.src = link;
    this._popupPhotosImage.alt = name;
    this._popupPhotosCaption.textContent = name;


    super.open();
  }
}
