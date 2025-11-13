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

//open and close modal
function openModal(modal) {
  modal.classList.add("modal_is_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is_opened");
}

//open and close edit profile modal
editProfile.addEventListener("click", (e) => {
  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");
  const formName = document.querySelector("#profile-name-input");
  const formDescription = document.querySelector("#profile-description-input");

  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
  openModal(editProfileModal);
});

editProfileClose.addEventListener("click", (e) => {
  closeModal(editProfileModal);
});

//open and close new post modal
newPost.addEventListener("click", (e) => {
  openModal(newPostModal);
});

newPostClose.addEventListener("click", (e) => {
  closeModal(newPostModal);
});

//card setup
initialCards.forEach((card) => {
  console.log(`Card Name: ${card.name}`);
});
