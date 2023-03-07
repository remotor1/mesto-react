import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext"; // Импортируем объект контекста user

function EditAvatarPopup(props) {
  // записываем объект, возвращаемый хуком, в переменную
  const avatarLinkRef = React.useRef();

  React.useEffect(() => {
    if (!props.isOpen) {
      avatarLinkRef.current.value = ""; // вызываем нужный метод на поле current объекта
    }
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateAvatar(avatarLinkRef.current.value);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      title="Обновить аватар"
      name="avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      children={
        <>
          <input
            ref={avatarLinkRef}
            type="url"
            id="popup__picture-link"
            name="picture-link"
            className="popup__picture-link popup__input"
            onChange={() => {}}
            placeholder="Avatar link"
            required
          />
          <div className="popup__input-error-wrapper">
            <span className="popup__picture-link-error popup__input-error"></span>
          </div>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
