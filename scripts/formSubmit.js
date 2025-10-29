//edit profile selectors
const editProfileForm = document.querySelector("#edit-profile-form");
const formName = editProfileModal.querySelector("#profile-name-input");
const formDescription = editProfileModal.querySelector("#profile-description-input");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
formName.value = profileName.textContent;
formDescription.value = profileDescription.textContent;

//new post selectors
const newPostForm = document.querySelector("#new-post-form");
const formImageURL = newPostModal.querySelector("#post-url-input");
const formCaption = newPostModal.querySelector("#post-caption-input");


//Profile form submit handler
function editProfileHandler(e) {
    e.preventDefault();

    profileName.textContent = formName.value;
    profileDescription.textContent = formDescription.value;

    editProfileModal.classList.remove("modal_is_opened")

    e.target.reset();

}
editProfileForm.addEventListener("submit", (e) => {
    editProfileHandler(e);
})

//New Post form submit handler
function newPostHandler(e) {
    e.preventDefault();

    console.log(formImageURL.value + ", " + formCaption.value);

    newPostModal.classList.remove("modal_is_opened")

    e.target.reset();

}
newPostForm.addEventListener("submit", (e) => {
    newPostHandler(e);
})

