import React, { useState } from "react";
import Shoppingcart from "../SvgComponent/Shoppingcart";
import EditLogo from "../SvgComponent/EditLogo";
import Trashcan from "../SvgComponent/Trashcan";
import SaveLogo from "../SvgComponent/SaveLogo";
import CancelLogo from "../SvgComponent/CancelLogo";

function GoodsList({
  goods,
  deleteGoodById,
  addToShoppingList,
  loggedIn,
  updateGood,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const startEditing = (good) => {
    setEditingId(good.id);
    setEditingValue(good.name);
  };

  const saveEdit = (good) => {
    const updatedGood = { ...good, name: editingValue };
    updateGood(updatedGood); // Call the function passed from App
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingValue("");
  };

  const confirmDelete = (goodId) => {
    const isConfirmed = window.confirm(
      "Er du sikker på, at du vil slette denne vare?"
    );
    if (isConfirmed) {
      deleteGoodById(goodId); // Proceed with deletion
    }
  };

  const filteredGoods = goods.filter((good) =>
    good.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Vareliste</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Søg efter varer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="items-grid">
        {filteredGoods.map((good) => (
          <div key={good.id} className="item-card">
            <div className="item-info">
              {editingId === good.id ? (
                <input
                  type="text"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  className="editing-input"
                  autoFocus
                />
              ) : (
                <>
                  <h3 className="item-name">{good.name}</h3>
                  <p className="item-id">ID: {good.id}</p>
                </>
              )}
            </div>
            
            <div className="item-actions">
              {editingId === good.id ? (
                <div className="button-group">
                  <button
                    onClick={() => saveEdit(good)}
                    className="save icon-button"
                    title="Gem ændringer"
                  >
                    <SaveLogo />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="cancel icon-button"
                    title="Annuller"
                  >
                    <CancelLogo />
                  </button>
                </div>
              ) : (
                <div className="button-group">
                  {loggedIn && (
                    <>
                      <button
                        onClick={() => startEditing(good)}
                        className="edit icon-button"
                        title="Rediger vare"
                      >
                        <EditLogo />
                      </button>
                      <button
                        onClick={() => confirmDelete(good.id)}
                        className="delete icon-button"
                        title="Slet vare"
                      >
                        <Trashcan />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => addToShoppingList(good)}
                    className="add-to-cart icon-button"
                    title="Tilføj til indkøbskurv"
                  >
                    <Shoppingcart />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {filteredGoods.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">
            {searchTerm ? '🔍' : '📦'}
          </div>
          <h3 className="empty-state-title">
            {searchTerm ? 'Ingen resultater' : 'Ingen varer'}
          </h3>
          <p className="empty-state-description">
            {searchTerm 
              ? 'Ingen varer matcher din søgning. Prøv med et andet søgeord.' 
              : 'Der er ingen varer tilgængelige endnu.'}
          </p>
        </div>
      )}
    </div>
  );
}

export default GoodsList;
