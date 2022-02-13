import Popup from './Popup.js';
import { popupPhotosImage, popupPhotosCaption } from './Card.js';

export default class PopupWithImage extends Popup {
  open ({ link, name }) {

    popupPhotosImage.src = link;
    popupPhotosImage.alt = name;
    popupPhotosCaption.textContent = name;

    super.open();
  }
}
