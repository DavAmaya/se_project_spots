export class Api {
  constructor({ baseUrl, headers }) {
    this.authorization = headers.authorization;
    this.baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
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
    return this._request(this.baseUrl + "/users/me", {
      method: "GET",
      headers: {
        authorization: this.authorization,
      },
    });
  }

  updateProfileInfo(name, about) {
    return this._request(this.baseUrl + "/users/me", {
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),

      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        authorization: this.authorization,
      },
    });
  }

  updateAvatar(avatar) {
    return this._request(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({
        avatar,
      }),

      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        authorization: this.authorization,
      },
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
    return this._request(this.baseUrl + "/cards", {
      method: "GET",
      headers: {
        authorization: this.authorization,
      },
    });
  }

  postCard(newPost) {
    return this._request(this.baseUrl + "/cards", {
      method: "POST",
      body: JSON.stringify({
        name: newPost.name,
        link: newPost.link,
      }),

      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        authorization: this.authorization,
      },
    });
  }

  likeCard(cardId) {
    return this._request(this.baseUrl + `/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this.authorization,
      },
    });
  }

  dislikeCard(cardId) {
    return this._request(this.baseUrl + `/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this.authorization,
      },
    });
  }

  deleteCard(cardId) {
    return this._request(this.baseUrl + `/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.authorization,
      },
    });
  }
}
