function ImagePopup(props) {
  return (
    <div
      className={`popup popup_picture ${
        props.selectedCard.name ? "popup_opened" : ""
      }`}
    >
      <div className="popup__picture-container">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        />
        <img
          src={props.selectedCard.link}
          alt={props.selectedCard.name}
          className="popup__picture-img"
        />
        <p className="popup__picture-subtitle">{props.selectedCard.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
