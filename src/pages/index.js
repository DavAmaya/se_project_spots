import {
  enableValidation,
  config,
  resetValidation,
} from "../scripts/validation.js";
import "./index.css";

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
//edit profile selectors
const editProfile = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileClose = editProfileModal.querySelector(".modal__close-btn");

//new post selectors
const newPost = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostClose = newPostModal.querySelector(".modal__close-btn");

//edit profile selectors
const editProfileForm = document.forms["edit-profile-form"];
const formName = editProfileModal.querySelector("#profile-name-input");
const formDescription = editProfileModal.querySelector(
  "#profile-description-input",
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//new post selectors
const newPostForm = document.querySelector("#new-post-form");
const formImageURL = newPostModal.querySelector("#post-url-input");
const formCaption = newPostModal.querySelector("#post-caption-input");

//cards selectors
const cardTemplate = document
  .querySelector("#cards__template")
  .content.querySelector(".card");

const cardsContainer = document.querySelector(".cards__list");

//post image popup selectors
const postModal = document.querySelector("#post-modal");
const postModalClose = postModal.querySelector(".modal__close-btn");

const postImgModal = postModal.querySelector(".modal__image");
const postCaption = postModal.querySelector(".modal__caption");

// Find all close buttons
const closeButtons = document.querySelectorAll(".modal__close-btn");
const modalOverlays = document.querySelectorAll(".modal");

//esc close handler
const handleEscClose = (e) => {
  if (e.key === "Escape") {
    closeButtons.forEach((button) => {
      const popup = button.closest(".modal");
      closeModal(popup);
    });
  }
};
//open and close modal
function openModal(modal) {
  modal.classList.add("modal_is_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is_opened");
  document.removeEventListener("keydown", handleEscClose);
}

//close button handler
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

//overlay close handler
modalOverlays.forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeModal(overlay);
    }
  });
});

//open handler edit profile modal
editProfile.addEventListener("click", (e) => {
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;

  resetValidation(editProfileForm, config);
  openModal(editProfileModal);
});

//open handler new post modal
newPost.addEventListener("click", (e) => {
  openModal(newPostModal);
});

//Profile form submit handler
function editProfileHandler(e) {
  e.preventDefault();

  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;

  closeModal(editProfileModal);
}
editProfileForm.addEventListener("submit", editProfileHandler);

//New Post form submit handler
function newPostHandler(e) {
  e.preventDefault();

  const post = {
    link: formImageURL.value,
    name: formCaption.value,
  };

  const cardElement = getCardElement(post);

  cardsContainer.prepend(cardElement);

  e.target.reset();
  resetValidation(newPostForm, config);

  closeModal(newPostModal);
}
newPostForm.addEventListener("submit", newPostHandler);

const getCardElement = (data) => {
  const card = cardTemplate.cloneNode(true);

  const cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = data.name;

  const cardImage = card.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;

  //like button setup
  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  //delete button setup
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    card.remove();
  });

  //post popup setup
  const postImg = card.querySelector(".card__image");
  postImg.addEventListener("click", () => {
    openModal(postModal);

    postImgModal.src = postImg.src;
    postImgModal.alt = postImg.alt;
    postCaption.textContent = data.name;
  });

  return card;
};

//card setup
initialCards.forEach((card) => {
  //card element setup
  const cardElement = getCardElement(card);
  cardsContainer["prepend"](cardElement);
});

enableValidation(config);
