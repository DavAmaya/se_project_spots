const cardTemplate = document
  .querySelector("#cards__template")
  .content.querySelector(".card");

const cardsContainer = document.querySelector(".cards__list");

//post image popup selectors
const postModal = document.querySelector("#post-modal");
const postModalClose = postModal.querySelector(".modal__close-btn");

const getCardElement = (data) => {
  const cardElement = cardTemplate.cloneNode(true);

  const titleElement = cardElement.querySelector(".card__title");
  titleElement.textContent = data.name;

  const linkElement = cardElement.querySelector(".card__image");
  linkElement.src = data.link;
  linkElement.alt = data.name;

  //like button setup
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  //delete button setup
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  //post popup setup
  const postImg = cardElement.querySelector(".card__image");
  postImg.addEventListener("click", () => {
    openModal(postModal);

    const postImgModal = postModal.querySelector(".modal__image");
    const postCaption = postModal.querySelector(".modal__caption");
    postImgModal.src = postImg.src;
    postImgModal.alt = postImg.alt;
    postCaption.textContent = data.name;
  });

  return cardElement;
};

postModalClose.addEventListener("click", () => {
  closeModal(postModal);
});

//card setup
initialCards.forEach((card) => {
  //card element setup
  const cardElement = getCardElement(card);
  cardsContainer.append(cardElement);
});
