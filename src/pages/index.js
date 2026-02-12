import {
  enableValidation,
  config,
  resetValidation,
} from "../scripts/validation.js";
import {
  token,
  editProfile,
  editProfileModal,
  newPost,
  newPostModal,
  deleteModal,
  deleteBtn,
  editProfileForm,
  formName,
  formDescription,
  profileName,
  profileDescription,
  profileAvatar,
  newPostForm,
  formImageURL,
  formCaption,
  postSave,
  profileSave,
  cardsContainer,
  cardTemplate,
  postModal,
  postImgModal,
  postCaption,
  closeButtons,
  modalOverlays,
  avatar,
  avatarModal,
  avatarForm,
  avatarSave,
  avatarInput,
  avatarURL,
} from "../utils/constant.js";
import "./index.css";
import { Api } from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: token,
  },
});

let selectedCard;
let selectedCardId;

//gets the User information and Cards and adds to the DOM
api
  .getAppInfo()
  .then(([cards, user]) => {
    cards.forEach((card) => {
      const cardEl = getCardElement(card);
      cardsContainer["append"](cardEl);
    });
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.src = user.avatar;
  })
  .catch((err) => {
    {
      console.error(`Error: ${err}`);
    }
  });

//edit avatar form listener
avatar.addEventListener("click", () => {
  openModal(avatarModal);
});

function handleAvatarSubmit(e) {
  e.preventDefault();

  avatarSave.textContent = "Saving...";

  api
    .updateAvatar(avatarInput.value)
    .then((res) => {
      avatarURL.src = res.avatar;
      closeModal(avatarModal);

      e.target.reset();
      resetValidation(avatarForm, config);
    })
    .catch((err) => console.error(`Error: ${err}`))
    .finally(() => {
      avatarSave.textContent = "Save";
    });
}

avatarForm.addEventListener("submit", handleAvatarSubmit);

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

  profileSave.textContent = "Saving...";

  api
    .updateProfileInfo(formName.value, formDescription.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    })
    .finally(() => {
      profileSave.textContent = "Save";
    });
}
editProfileForm.addEventListener("submit", editProfileHandler);

//New Post form submit handler
function newPostHandler(e) {
  e.preventDefault();

  const post = {
    link: formImageURL.value,
    name: formCaption.value,
  };

  postSave.textContent = "Saving...";

  //api call to create new post and adds to DOM
  api
    .postCard(post)
    .then((post) => {
      const cardElement = getCardElement(post);

      cardsContainer.prepend(cardElement);

      e.target.reset();
      resetValidation(newPostForm, config);

      closeModal(newPostModal);
    })
    .catch((err) => {
      {
        console.error(err);
      }
    })
    .finally(() => {
      postSave.textContent = "Save";
    });
}
newPostForm.addEventListener("submit", newPostHandler);

//opens the delete modal for confirmation
function handleDeleteCard(cardEl, data) {
  selectedCard = cardEl;
  selectedCardId = data._id;
  openModal(deleteModal);
}

//delete api call request and remove card from DOM
function handleDeleteSubmit() {
  deleteBtn.textContent = "Deleting....";
  api
    .deleteCard(selectedCardId)
    .then((res) => {
      if (res) {
        selectedCard.remove();
        closeModal(deleteModal);
      }
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    })
    .finally(() => {
      deleteBtn.textContent = "Delete";
    });
}

deleteModal.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleDeleteSubmit();
});

const getCardElement = (data) => {
  const card = cardTemplate.cloneNode(true);

  const cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = data.name;

  const cardImage = card.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;

  //like button setup
  const likeButton = card.querySelector(".card__like-button");
  if (data.isLiked) {
    likeButton.classList.add("card__like-button_active");
  }

  //like button functionality toggle class
  likeButton.addEventListener("click", () => {
    if (!data.isLiked) {
      api
        .likeCard(data._id)
        .then((res) => {
          data.isLiked = res.isLiked;
        })
        .catch((err) => {
          console.error(`Error: ${err}`);
        });
    } else {
      api
        .dislikeCard(data._id)
        .then((res) => {
          data.isLiked = res.isLiked;
        })
        .catch((err) => {
          console.error(`Error: ${err}`);
        });
    }
    likeButton.classList.toggle("card__like-button_active");
  });

  //delete button setup
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    handleDeleteCard(card, data);
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

enableValidation(config);
