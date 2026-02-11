export class Api {
  constructor({ baseUrl, headers }) {
    this.authorization = headers.authorization;
    this.baseUrl = baseUrl;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUser()]);
  }

  /*
  User routes
  
GET /users/me – Get the current user’s info
PATCH /users/me – Update your profile information
PATCH /users/me/avatar – Update avatar
*/

  getUser() {
    return fetch(this.baseUrl + "/users/me", {
      method: "GET",
      headers: {
        authorization: this.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateProfileInfo(name, about) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),

      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        authorization: this.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateAvatar(avatar) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({
        avatar,
      }),

      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        authorization: this.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  /*
Card routes

GET /cards – Get all cards
POST /cards – Create a card
DELETE /cards/:cardId – Delete a card
PUT /cards/:cardId/likes – Like a card
DELETE /cards/:cardId/likes – Dislike a card*/

  getInitialCards() {
    return fetch(this.baseUrl + "/cards", {
      method: "GET",
      headers: {
        authorization: this.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  postCard(newPost) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      body: JSON.stringify({
        name: newPost.name,
        link: newPost.link,
      }),

      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        authorization: this.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  likeCard(cardId) {
    return fetch(this.baseUrl + `/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  dislikeCard(cardId) {
    return fetch(this.baseUrl + `/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return fetch(this.baseUrl + `/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
