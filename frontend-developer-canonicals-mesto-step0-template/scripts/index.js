function openModal(popup) {
    popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
    popup.classList.remove("popup_is-opened");
}

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const placesList = document.querySelector(".places__list");

[profilePopup, cardPopup, imagePopup].forEach((popup) =>
    popup.classList.add("popup_is-animated")
);

const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");

imagePopupCloseButton.addEventListener("click", () => closeModal(imagePopup));

function addCardHandlers(cardElement, name, link) {
    const cardImage = cardElement.querySelector(".card__image");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    cardImage.addEventListener("click", () => {
        imagePopupImage.src = link;
        imagePopupImage.alt = name;
        imagePopupCaption.textContent = name;
        openModal(imagePopup);
    });

    likeButton.addEventListener("click", () =>
        likeButton.classList.toggle("card__like-button_is-active")
    );

    deleteButton.addEventListener("click", () => {
        cardElement.remove();
    });
}

function createCard({ name, link }) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector(".card__image").src = link;
    cardElement.querySelector(".card__image").alt = name;
    cardElement.querySelector(".card__title").textContent = name;

    addCardHandlers(cardElement, name, link);

    return cardElement;
}

const cards = initialCards.map(createCard);
placesList.append(...cards);

placesList.addEventListener('click', (event) => {
    if (event.target.classList.contains('card__delete-button')) {
        event.target.closest('.card').remove();
    }
});

const profileForm = profilePopup.querySelector(".popup__form");
const openEditProfileButton = document.querySelector(".profile__edit-button");
const closeEditProfileButton = profilePopup.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = profilePopup.querySelector(
    ".popup__input_type_name"
);
const profileDescriptionInput = profilePopup.querySelector(
    ".popup__input_type_description"
);

function handleProfileEdit() {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(profilePopup);
}

function handleProfileFormSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profilePopup);
}

openEditProfileButton.addEventListener("click", handleProfileEdit);
closeEditProfileButton.addEventListener("click", () => closeModal(profilePopup));
profileForm.addEventListener("submit", handleProfileFormSubmit);

const cardForm = cardPopup.querySelector(".popup__form");
const addCardButton = document.querySelector(".profile__add-button");
const closeCardButton = cardPopup.querySelector(".popup__close");
const cardNameInput = cardPopup.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardPopup.querySelector(".popup__input_type_url");

function handleAddCard() {
    cardNameInput.value = "";
    cardLinkInput.value = "";
    openModal(cardPopup);
}

function handleCardFormSubmit(e) {
    e.preventDefault();
    const newCard = createCard({ name: cardNameInput.value, link: cardLinkInput.value });
    placesList.prepend(newCard);
    closeModal(cardPopup);
}

addCardButton.addEventListener("click", handleAddCard);
closeCardButton.addEventListener("click", () => closeModal(cardPopup));
cardForm.addEventListener("submit", handleCardFormSubmit);