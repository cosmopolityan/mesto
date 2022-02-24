import Popup from './Popup.js';
// import { popupPhotosImage, popupPhotosCaption } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  open ({ link, name }) {
    const popupPhotosImage = document.querySelector('.popup-photo__image');
    const popupPhotosCaption = document.querySelector('.popup-photo__caption');

    popupPhotosImage.src = link; // Uncaught ReferenceError: popupPhotosImage is not defined
    popupPhotosImage.alt = name;
    popupPhotosCaption.textContent = name;

    super.open();
  }
}
