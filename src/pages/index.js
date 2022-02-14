import './index.css';
import { initialCards, enableValidation, photosList, popupAdd, inputPhotoName, inputPhotoLink, popupPhotos, editForm, addForm, submitEditButton, submitAddButton, editButton, addButton, nameElement, jobElement, profilePopup, profilePopupCloseButton, popupAddCloseButton, popupPhotosCloseButton, nameInput, jobInput } from '../components/utils/constants.js';
import { Card } from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


// Валидация (работает):
const editValidator = new FormValidator(enableValidation, profilePopup);
const addValidator = new FormValidator(enableValidation, popupAdd);
editValidator.enableValidation();
addValidator.enableValidation();
//

// Карточка (работает)
const popupImage = new PopupWithImage('.popup-photo');
popupImage.setEventListeners();

function createCard(item) {
  const card = new Card(item, '#element-template', () => {
    popupImage.open({ link: item.link, name: item.name });
  });
  return card.addPhotosElement();
}
//

// Редактирование профиля (работает):
const userInfo = new UserInfo({ nameSelector: '.profile__name', captionSelector: '.profile__description' });

const popupEdit = new PopupWithForm('#profile_popup', (formData) => {
  if (!editValidator.checkFormValidity()) {
    userInfo.setUserInfo(formData.name, formData.job);
    popupEdit.close();
  }
});

popupEdit.setEventListeners();

editButton.addEventListener('click', () => {
  const userInfoObject = userInfo.getUserInfo();
  nameInput.value = userInfoObject.userName;
  jobInput.value = userInfoObject.userCaption;

  editValidator.setAbleButton(submitEditButton);
  editValidator.clearErrorElements();
  popupEdit.open();
});
//

// Начальные карточки (работает)
const initialCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    initialCardList.addItem(cardElement);
  }
}, '.elements__list');

initialCardList.renderItems();
//

// Добавление (работает):
const submitCard = new PopupWithForm('#card_popup', (dataForm) => {
  if (!addValidator.checkFormValidity()) {
    const cardElement = createCard({ link: dataForm.link, name: dataForm.title });
    initialCardList.addNextItem(cardElement);

    submitCard.close();
  }
});

submitCard.setEventListeners();


addButton.addEventListener('click', () => {

  addValidator.setDisableButton(submitAddButton);
  addValidator.clearErrorElements();
  submitCard.open();
});
