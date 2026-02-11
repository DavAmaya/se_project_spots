export const token = "02e35270-f5ff-48f3-8c2d-f963201d2255";
//edit profile selectors
export const editProfile = document.querySelector(".profile__edit-button");
export const editProfileModal = document.querySelector("#edit-profile-modal");

//new post selectors
export const newPost = document.querySelector(".profile__add-button");
export const newPostModal = document.querySelector("#new-post-modal");

//delete modal
export const deleteModal = document.querySelector("#delete-modal");
export const deleteBtn = deleteModal.querySelector(".modal__delete_btn");

//edit profile selectors
export const editProfileForm = document.forms["edit-profile-form"];
export const formName = editProfileModal.querySelector("#profile-name-input");
export const formDescription = editProfileModal.querySelector(
  "#profile-description-input",
);
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
  ".profile__description",
);
export const profileAvatar = document.querySelector(".profile__avatar");

//new post selectors
export const newPostForm = document.querySelector("#new-post-form");
export const formImageURL = newPostModal.querySelector("#post-url-input");
export const formCaption = newPostModal.querySelector("#post-caption-input");

export const postSave = newPostModal.querySelector(".modal__btn");
export const profileSave = editProfileModal.querySelector(".modal__btn");

//cards selectors
export const cardTemplate = document
  .querySelector("#cards__template")
  .content.querySelector(".card");

export const cardsContainer = document.querySelector(".cards__list");

//post image popup selectors
export const postModal = document.querySelector("#post-modal");

export const postImgModal = postModal.querySelector(".modal__image");
export const postCaption = postModal.querySelector(".modal__caption");

// Find all close buttons
export const closeButtons = document.querySelectorAll(
  ".modal__close-btn, .modal__cancel_btn",
);
export const modalOverlays = document.querySelectorAll(".modal");

//avatar queries
export const avatar = document.querySelector(".profile__avatar_container");
export const avatarModal = document.querySelector("#avatar-modal");
export const avatarForm = document.forms["avatar-form"];
export const avatarSave = avatarModal.querySelector(".modal__btn");
export const avatarInput = avatarModal.querySelector("#avatar-url-input");
export const avatarURL = avatar.querySelector(".profile__avatar");
