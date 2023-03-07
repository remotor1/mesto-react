import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext"; // Импортируем объект контекста user

function EditProfilePopup(props) {
  //добавьте стейт-переменные name и description и привяжите их к полям ввода, сделав их управляемыми
  //Стейт, в котором содержится значение инпута
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  // Обработчик изменения инпута обновляет стейт name
  function handleChangeName(e) {
    setName(e.target.value);
  }
  // Обработчик изменения инпута обновляет стейт Description
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  // добавить обработчик handleSubmit
  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      title="Редактировать профиль"
      name="profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      children={
        <>
          <input
            value={name || ""}
            onChange={handleChangeName}
            id="popup__profile-name"
            name="name"
            type="text"
            className="popup__input"
            required
            minLength="2"
            maxLength="40"
            placeholder="имя"
          />
          <div className="popup__input-error-wrapper">
            <span className="popup__profile-name-error popup__input-error"></span>
          </div>
          <input
            value={description || ""}
            onChange={handleChangeDescription}
            id="popup__job"
            name="job"
            type="text"
            className="popup__job popup__input"
            required
            minLength="2"
            maxLength="200"
            placeholder="род занятий"
          ></input>
          <div className="popup__input-error-wrapper">
            <span className="popup__job-error popup__input-error"></span>
          </div>
        </>
      }
    />
  );
}

export default EditProfilePopup;
