class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`https://${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`https://mesto.${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  setUserInfo(name, about) {
    return fetch(`https://mesto.${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getResponseData);
  }

  addCard(name, link) {
    return fetch(`https://mesto.${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(id) {
    return fetch(`https://mesto.${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }
  updateAvatar(avatar, id) {
    return fetch(`https://mesto.${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._getResponseData);
  }

  setUserAvatar(avatar, id) {
    return fetch(`https://mesto.${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(cardID, like) {
    return fetch(`https://mesto.${this._baseUrl}/cards/${cardID}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }
}

const api = new Api({
  baseUrl: "nomoreparties.co/v1/cohort-47",
  headers: {
    authorization: "f98f9cb4-e18b-46d2-a787-d3d5dad68294",
    "Content-Type": "application/json",
  },
});

export default api;
