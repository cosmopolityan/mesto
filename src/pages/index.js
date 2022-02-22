import './index.css';
import { enableValidation, photosList, popupAdd, inputPhotoName, inputPhotoLink, popupPhotos, popupPhotosImage, popupPhotosCaption, popups, editForm, addForm, avatarBlock, submitEditButton, submitAddButton, profileElement, editButton, addButton, nameElement, jobElement, profilePopup, profilePopupCloseButton, popupAddCloseButton, popupPhotosCloseButton, nameInput, jobInput, avatarPopup, avatarPopupCloseButton, submitDelButton, formElementAvatar, submitAvatarButton } from '../components/utils/constants.js';
import { Card } from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js'
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'

const renderLoading = (element, isLoading, initialText) => {
  if (isLoading) {
    element.textContent = 'Сохранение...'
  } else {
    element.textContent = initialText
  }
};

//

// User Info:
const userInfo = new UserInfo({ nameSelector: '.profile__name', captionSelector: '.profile__description', avatarSelector: '.profile__avatar' });

// Карточка:
const popupImage = new PopupWithImage('.popup-photo');
popupImage.setEventListeners();

const popupDel = new PopupWithSubmit('#confirm-delete-card_popup') // через класс?
popupDel.setEventListeners();


// Начальные карточки:

const initialCardList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    initialCardList.addItem(cardElement);
  }
}, '.elements__list')

//

// Получение данных через API:

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: 'c848aad0-462d-42a9-8fc3-c67e20450e85',
    'Content-Type': 'application/json'
  }
});

let userId;

api.getInitialData()
  .then((arg) => {
    const [dataFirtsPromise, dataSecondPromise] = arg;
    userInfo.setUserInfo(dataFirtsPromise.name, dataFirtsPromise.about);
    userInfo.setAvatar(dataFirtsPromise.avatar);
    userId = dataFirtsPromise._id;
    initialCardList.renderItems(dataSecondPromise);
  })
  .catch((err) => {
    console.log(err);
  });

//


// Валидация:
const editValidator = new FormValidator(enableValidation, profilePopup);
const addValidator = new FormValidator(enableValidation, popupAdd);
const avatarValidator = new FormValidator(enableValidation, avatarPopup);

editValidator.enableValidation();
addValidator.enableValidation();
avatarValidator.enableValidation();
//

// Создание карточки:
const createCard = (item) => {
  const card = new Card({
    cardData: item,
    handleCardClick: () => popupImage.open({ link: item.link, name: item.name }),
    handleLikeClick: () => {
      if (!card.isLiked()) {
        api.setLike(item._id)
          .then((res) => {
            card.likeCounter = res.likes.length;
            card.countLike()
            card.likeArr = res.likes
            card.likeCard()
          })
          .catch((err) => {
            console.log(err);
          })
      }
      else {
        api.deleteLike(item._id)
          .then((res) => {
            card.likeCounter = res.likes.length;
            card.countLike()
            card.likeArr = res.likes
            card.likeCard()
          })
          .catch((err) => {
            console.log(err);
          })
      }
    },
    handleDelClick: () => {
      popupDel.setSubmitAction(() => {
        api.deleteItem(item._id)
          .then((res) => {
            card.deleteCard()
            popupDel.close();
          })
          .catch((err) => {
            console.log(err);
          })
      })

      popupDel.open()
    },
    userId: userId,
  });
  // **
  return card.addPhotosElement();
}
//

// Попап редактирования профиля:

const popupEdit = new PopupWithForm('#profile_popup', (formData) => {
  if (!editValidator.checkFormValidity()) {
    renderLoading(submitEditButton, true);
    api.editProfileInfo({ name: formData.name, about: formData.job })
      .then((result) => {
        userInfo.setUserInfo(result.name, result.about);
        popupEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(submitEditButton, false, 'Сохранить')
      })
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

// Добавление:
const submitCard = new PopupWithForm('#card_popup', (dataForm) => {
  if (!addValidator.checkFormValidity()) {
    renderLoading(submitAddButton, true);
    api.postItem({ link: dataForm.link, name: dataForm.title })
      .then((result) => {
        const cardElement = createCard(result);
        initialCardList.addNextItem(cardElement);
        submitCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(submitAddButton, false, 'Создать')
      })
  }
});

submitCard.setEventListeners();


addButton.addEventListener('click', () => {

  addValidator.setDisableButton(submitAddButton);
  addValidator.clearErrorElements();
  submitCard.open();
});

// Попап смены аватара:
const popupAvatar = new PopupWithForm('#confirm-edit-profile-avatar_popup', (formData) => {
  if (!avatarValidator.checkFormValidity()) {
    renderLoading(submitAvatarButton, true);
    api.editAvatar({ avatar: formData.avatar })
      .then((result) => {
        userInfo.setAvatar(result.avatar);
        popupAvatar.close()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(submitAvatarButton, false, 'Сохранить')
      });
  }
});

popupAvatar.setEventListeners();

avatarBlock.addEventListener('click', () => {

  avatarValidator.setDisableButton(submitAddButton)
  avatarValidator.clearErrorElements();
  popupAvatar.open();
});
