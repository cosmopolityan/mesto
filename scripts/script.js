let profileElement = document.querySelector('.profile');
// Объявленная переменная = результат поиска секции .profile во всем документе.

let editButton = profileElement.querySelector('.profile__edit-button');
// Объявленная переменная = результат поиска кнопки .profile__edit-button в секции .profile.

let nameElement = profileElement.querySelector('.profile__name');
// Объявленная переменная = результат поиска поля .profile__name в секции .profile.

let jobElement = profileElement.querySelector('.profile__description');
// Объявленная переменная = результат поиска поля .profile__description в секции .profile.

let popupElement = document.querySelector('.popup');
// Объявленная переменная = результат поиска секции .popup во всем документе.
const popupElementOpen = 'popup_opened';
// Объявленная константа со значением класса, чтобы в дальнейшем передать ее как аргумент в функцию.

let closeButton = popupElement.querySelector('.popup__close-button');
// Объявленная переменная = результат поиска кнопки .popup__close-button в секции .popup.
let formElement = popupElement.querySelector('.popup__form');
// Объявленная переменная = результат поиска формы .popup__form в секции .popup.

let nameInput = formElement.querySelector('.popup__input[name="name"]');
// Объявленная переменная = результат поиска инпута .popup__input с id = name в форме .popup__form.
let jobInput = formElement.querySelector('.popup__input[name="job"]');
// Объявленная переменная = результат поиска инпута .popup__input с id = job в форме .popup__form.

function popupToggle() {
  popupElement.classList.toggle(popupElementOpen);
}
// Функция добавления/удаления класса .popup_opened элементу .popup.

function popupOpen() {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
// Без этих 2 строк, попап открывается, но в полях нет значений из DOM, только информация из placeholder'а.
  popupToggle(); // '.popup' => '.popup popup_opened'
}
// Функция присваивает полям "вытянутые" из DOM значения в соотв. полях.


function formSubmitHandler(evt) {
  evt.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  popupToggle(); // '.popup popup_opened' => '.popup'
}
// Функция "перезаписывает" имеющиеся значения на новые, введенные пользователем.

editButton.addEventListener('click', popupOpen);
// добавленный ивентлиссенер по клику вызывает функцию popupOpen => попап открывается.
closeButton.addEventListener('click', popupToggle);
// добавленный ивентлиссенер по клику вызывает функцию popupToggle -> '.popup popup_opened' => '.popup'.
formElement.addEventListener('submit', formSubmitHandler);
// добавленный ивентлиссенер по клику вызывает функцию formSubmitHandler -> отменяет стандартную отправку формы, устанавливает введенные пользователем значения в соотв. поля, перезаписывает их в DOM после нажатия кнопки 'Сохранить' [submit].

/*

// Находим форму в DOM
let formElement = // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = // Воспользуйтесь инструментом .querySelector()
let jobInput = // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

*/
