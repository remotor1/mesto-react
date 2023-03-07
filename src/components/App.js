import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext"; // Импортируем объект контекста user

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  // Создайте стейт currentUser в корневом компоненте
  const [currentUser, setCurrentUser] = React.useState({});

  const [selectedCard, setSelectedCard] = React.useState({});
  // 7. Настройте карточки мест
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cardList) => {
        setCards(cardList);
      })
      .catch(console.log);
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.log);
  }

  //Добавьте поддержку удаления карточки
  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((Cards) =>
          Cards.filter(function (item) {
            return card !== item;
          })
        );
      })
      .catch(console.log);
  }

  //эффект при монтировании, который будет вызывать api.getUserInfo и обновлять стейт-переменную из полученного значения.
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res); //currentUser info
      })
      .catch(console.log);
  }, []);

  const handleCardClick = (props) => {
    setSelectedCard(props);
  };

  const handleEditProfilePopupOpen = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlacePopupOpen = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarPopupOpen = () => {
    setEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);

    setSelectedCard({});
  };

  const handleUpdateUser = (name, about) => {
    api
      .setUserInfo(name, about)
      .then(() => {
        // const newObjectCurrentUser = { ...currentUser };
        // newObjectCurrentUser.name = name;
        // newObjectCurrentUser.about = about;
        // setCurrentUser(newObjectCurrentUser);
        setCurrentUser({ ...currentUser, name, about });
        closeAllPopups();
      })
      .catch(console.log);
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .setUserAvatar(avatar)
      .then((res) => {
        //console.log("CurrentUser", currentUser);
        setCurrentUser(res);
        //document.querySelector(".profile__avatar").src = avatar;
        closeAllPopups();
      })
      .catch(console.log);
  };

  const handleAddPlace = (name, link) => {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.log);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        onEditProfile={() => {
          handleEditProfilePopupOpen();
        }}
        onAddPlace={() => {
          handleAddPlacePopupOpen();
        }}
        onEditAvatar={() => {
          handleEditAvatarPopupOpen();
        }}
        onCardClick={handleCardClick}
      />
      <Footer />
      <EditProfilePopup
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />
      <AddPlacePopup
        onAddPlace={handleAddPlace}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />
      <EditAvatarPopup
        onUpdateAvatar={handleUpdateAvatar}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        buttonText="Да"
        title="Вы уверены?"
        name="delete-confirm"
      />

      <ImagePopup
        selectedCard={selectedCard}
        onClose={() => {
          closeAllPopups();
        }}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
