import { useState, useEffect } from "react";
import GoodsList from "./components/GoodsList";
import GoodsForm from "./components/GoodsForm";
import ShoppingList from "./components/ShoppingList";
import LogIn from "./components/LogIn";
import facade from "./utils/apiFacade";
import "./styles/App.css";
import LoginLogo from "./SvgComponent/LoginLogo";
import LogOut from "./SvgComponent/LogOut";

const blankGood = {
  id: "",
  name: "",
};

function App() {
  const [goods, setGoods] = useState([]);
  const [shoppings, setShoppings] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // Controls login page visibility
  const [loginError, setLoginError] = useState(""); // Tracks login error message
  const [goodToEdit, setGoodToEdit] = useState(blankGood);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch shopping lists (available for both guests and logged-in users)
    facade
      .fetchData("shoppinglists")
      .then((data) => setShoppings(data))
      .catch((err) => console.error("Failed to fetch shopping lists:", err));

    // Fetch goods (always available to guests and logged-in users)
    facade
      .fetchData("products")
      .then((data) => setGoods(data))
      .catch((err) => console.error("Failed to fetch goods:", err));
  }, [loggedIn]);

  const login = (username, password) => {
    facade
      .login(username, password)
      .then(() => {
        setLoggedIn(true);
        setShowLogin(false); // Hide login page after successful login
        setLoginError(""); // Clear any previous error messages
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setLoginError("Forkert brugernavn eller kodeord. Prøv igen."); // Set error message
      });
  };

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };

  const addToShoppingList = (good) => {
    facade
      .fetchData("shoppinglists", "POST", good)
      .then((newShoppingItem) => setShoppings([...shoppings, newShoppingItem]))
      .catch((err) => console.error("Failed to add to shopping list:", err));
  };

  const deleteGoodFromShoppingListById = (goodId) => {
    facade
      .fetchData(`shoppinglists/${goodId}`, "DELETE")
      .then(() =>
        setShoppings(shoppings.filter((shopping) => shopping.id !== goodId))
      )
      .catch((err) =>
        console.error("Failed to delete from shopping list:", err)
      );
  };

  const deleteGoodById = (goodId) => {
    if (!loggedIn) return; // Restrict deletion for guests
    facade
      .fetchData(`products/${goodId}`, "DELETE")
      .then(() => setGoods(goods.filter((good) => good.id !== goodId)))
      .catch((err) => console.error("Failed to delete good:", err));
  };

  const updateGood = (good) => {
    facade
      .fetchData(`products/${good.id}`, "PUT", good)
      .then((updatedGood) => {
        setGoods((prevGoods) =>
          prevGoods.map((g) => (g.id === updatedGood.id ? updatedGood : g))
        );
      })
      .catch((err) => console.error("Failed to update good:", err));
  };

  const createGood = (good) => {
    const { id, ...newGood } = good;
    facade
      .fetchData("products", "POST", newGood)
      .then((createdGood) => setGoods([...goods, createdGood]))
      .catch((err) => console.error("Failed to create good:", err));
  };

  const mutateGood = (good) => {
    if (good.id !== "") {
      updateGood(good);
    } else {
      createGood(good);
    }
  };

  const resetForm = () => {
    setGoodToEdit(blankGood);
    setIsEditing(false);
  };

  if (showLogin) {
    // Render the login page
    return (
      <div className="login-container">
        <LogIn
          login={login}
          onCancel={() => setShowLogin(false)}
          loginError={loginError}
          clearError={() => setLoginError("")}
        />
      </div>
    );
  }

  // Render the application page
  return (
    <div className="app-wrapper">
      <img
        src="baeTechTransparentRedSmall.png"
        alt="Logo"
        style={{
          width: "350px",
          height: "auto",
          display: "block",
          margin: "0 auto",
        }}
      />

      <div className="container">
        {!loggedIn ? (
          <button onClick={() => setShowLogin(true)} className="login-button">
            <LoginLogo />
          </button>
        ) : (
          <button onClick={logout} className="logout-button">
            <LogOut />
          </button>
        )}
        <div className="left-panel">
          {loggedIn && (
            <GoodsForm
              blankGood={blankGood}
              goodToEdit={goodToEdit}
              mutateGood={mutateGood}
              resetForm={resetForm}
              isEditing={isEditing}
            />
          )}
          <GoodsList
            goods={goods}
            deleteGoodById={deleteGoodById}
            addToShoppingList={addToShoppingList}
            loggedIn={loggedIn}
            updateGood={updateGood} // Pass updateGood to handle edits
          />
        </div>
        <div className="right-panel">
          <ShoppingList
            shoppings={shoppings}
            deleteGoodFromShoppingListById={deleteGoodFromShoppingListById}
          />
        </div>
      </div>
      <footer className="footer">
        <p>© {new Date().getFullYear()} baeTech. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
