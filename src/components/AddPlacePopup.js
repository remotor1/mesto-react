import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [image, setImage] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleImageChange(e) {
    setImage(e.target.value);
    //console.log(image);
  }

  function handleDescriptionChange(e) {
    //console.log(2);
    setDescription(e.target.value);
    //console.log(description);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlace(description, image);
  }

  React.useEffect(() => {
    if (!props.isOpen) {
      setImage("");
      setDescription("");
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleAddPlaceSubmit}
      buttonText="Создать"
      title="Новое место"
      name="mesto"
      isOpen={props.isOpen}
      onClose={props.onClose}
      children={
        <>
          <input
            type="text"
            id="popup__mesto-name"
            name="mesto-name"
            className="popup__input"
            onChange={handleDescriptionChange}
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
            value={description || ""}
          />
          <div className="popup__input-error-wrapper">
            <span className="popup__mesto-name-error popup__input-error"></span>
          </div>
          <input
            type="url"
            id="popup__link"
            name="link"
            className="popup__link popup__input"
            onChange={handleImageChange}
            placeholder="Ссылка на картинку"
            required
            value={image || ""}
          />
          <div className="popup__input-error-wrapper">
            <span className="popup__link-error popup__input-error"></span>
          </div>
        </>
      }
    />
  );
}

export default AddPlacePopup;
