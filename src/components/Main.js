import React from "react";
import api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext"; // Импортируем объект контекста user

function Main(props) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-wraper">
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
          />

          <button
            className="profile__edit-avatar"
            type="button"
            onClick={props.onEditAvatar}
          />
        </div>
        <h1 className="profile__name">{currentUser.name}</h1>
        <p className="profile__occupation">{currentUser.about}</p>
        <button
          className="profile__edit-button"
          type="button"
          onClick={props.onEditProfile}
        />
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        />
      </section>

      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card) => (
            <Card
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              onCardClick={props.onCardClick}
              card={card}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
