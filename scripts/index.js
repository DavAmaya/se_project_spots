//edit profile selectors
const editProfile = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileClose = editProfileModal.querySelector(".modal__close-btn");

//new post selectors
const newPost = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostClose = newPostModal.querySelector(".modal__close-btn");

//open and close modal
function openModal(e) {
  if (e.target.classList.contains("profile__edit-button")) {
    editProfileModal.classList.add("modal_is_opened");
  } else if (e.target.classList.contains("profile__add-button")) {
    newPostModal.classList.add("modal_is_opened");
  }
}

function closeModal(e) {
  if (e.target.classList.contains("profile__edit-button")) {
    editProfileModal.classList.remove("modal_is_opened");
  } else if (e.target.classList.contains("profile__add-button")) {
    newPostModal.classList.remove("modal_is_opened");
  }
}

//open and close edit profile modal
editProfile.addEventListener("click", (e) => {
  openModal(e);
});

editProfileClose.addEventListener("click", (e) => {
  closeModal(e);
});

//open and close new post modal
newPost.addEventListener("click", (e) => {
  openModal(e);
});

newPostClose.addEventListener("click", (e) => {
  closeModal(e);
});
