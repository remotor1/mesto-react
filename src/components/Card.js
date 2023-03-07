import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext"; // Импортируем объект контекста user

export default function Card(props) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "elements__delete" : "elements__delete_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = isLiked
    ? `elements__like elements__like_active`
    : `elements__like`;

  const handleClick = () => {
    props.onCardClick(props.card);
  };

  //добавьте в Card обработчик клика
  const handleLikeClick = () => {
    props.onCardLike(props.card);
  };
  //добавьте в Card обработчик delete
  const handleDeleteClick = () => {
    props.onCardDelete(props.card);
  };

  return (
    <li className="elements__element" key={props.card._id}>
      <button
        onClick={() => {
          handleDeleteClick();
        }}
        className={cardDeleteButtonClassName}
        type="button"
      />
      <img
        onClick={() => {
          handleClick();
        }}
        src={props.card.link}
        alt={props.card.name}
        className="elements__picture"
      />
      <div className="elements__wrapper">
        <p className="elements__name">{props.card.name}</p>
        <div className="elements__like-wrapper">
          <button
            onClick={() => {
              handleLikeClick();
            }}
            className={cardLikeButtonClassName}
            type="button"
          />
          <span className="elements__like-count">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </li>
  );
}
