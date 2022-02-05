import { popups } from './consts.js';
// Открытие любого попапа

const openPopup = (elem) => {
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
}

// Закрытие любого попапа (3 способа)

const closePopup = (elem) => {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
}

const closeEsc = (elem) => {
  if (elem.key === "Escape") {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
}

popups.forEach(elem => {
  elem.addEventListener('mousedown', (evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(elem);
    }
  }));
});

export { openPopup, closePopup, closeEsc };
