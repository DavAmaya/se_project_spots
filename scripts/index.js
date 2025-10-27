//edit profile selectors
const editProfile = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileClose = editProfileModal.querySelector(".modal__close-btn");

//new post selectors
const newPost = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostClose = newPostModal.querySelector(".modal__close-btn");

//open and close edit profile modal
editProfile.addEventListener("click", (e) => {
    editProfileModal.classList.add("modal_is_opened")
})

editProfileClose.addEventListener("click", (e) => {
    editProfileModal.classList.remove("modal_is_opened")
})

//open and close new post modal
newPost.addEventListener("click", (e) => {
    newPostModal.classList.add("modal_is_opened")
})

newPostClose.addEventListener("click", (e) => {
    newPostModal.classList.remove("modal_is_opened")
})
