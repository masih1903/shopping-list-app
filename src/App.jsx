import { useState } from "react";
import { GoodsList, GoodsForm, ShoppingList, LogIn, Header } from "./components";
import { useAuth, useGoods, useShoppingList } from "./hooks";
import { DEFAULTS } from "./utils/constants";
import "./styles/App.css";

function App() {
  // Authentication state
  const { loggedIn, showLogin, loginError, login, logout, openLogin, closeLogin, clearError } = useAuth();
  
  // Data management hooks
  const { goods, mutateGood, updateGood, deleteGood } = useGoods(loggedIn);
  const { shoppings, addToShoppingList, removeFromShoppingList } = useShoppingList();
  
  // Form state
  const [goodToEdit, setGoodToEdit] = useState(DEFAULTS.BLANK_GOOD);
  const [isEditing, setIsEditing] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  // Form management functions
  const handleMutateGood = async (good) => {
    try {
      await mutateGood(good);
      resetForm();
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  const resetForm = () => {
    setGoodToEdit(DEFAULTS.BLANK_GOOD);
    setIsEditing(false);
  };

  const resetToHome = () => {
    // Reset all states to initial/home state
    closeLogin();
    setGoodToEdit(DEFAULTS.BLANK_GOOD);
    setIsEditing(false);
    // Trigger reset in child components
    setResetTrigger(prev => prev + 1);
  };

  if (showLogin) {
    // Render the login page
    return (
      <div className="login-container">
        <LogIn
          login={login}
          onCancel={closeLogin}
          loginError={loginError}
          clearError={clearError}
          resetToHome={resetToHome}
        />
      </div>
    );
  }

  // Render the application page
  return (
    <div className="app-wrapper">
      <Header 
        loggedIn={loggedIn}
        onLogin={openLogin}
        onLogout={logout}
        onResetToHome={resetToHome}
      />

      <div className="container">
        
        <div className="left-panel">
          {loggedIn && (
            <div className="card">
              <GoodsForm
                goodToEdit={goodToEdit}
                mutateGood={handleMutateGood}
                resetForm={resetForm}
                isEditing={isEditing}
              />
            </div>
          )}
          <div className="card">
            <GoodsList
              goods={goods}
              deleteGoodById={deleteGood}
              updateGood={updateGood}
              addToShoppingList={addToShoppingList}
              loggedIn={loggedIn}
              resetToDefaults={resetTrigger}
            />
          </div>
        </div>
        
        <div className="right-panel">
          <div className="card card-compact">
            <ShoppingList
              shoppings={shoppings}
              deleteGoodFromShoppingListById={removeFromShoppingList}
            />
          </div>
        </div>
      </div>
      
      <footer className="footer">
        <p>© {new Date().getFullYear()} MK. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
