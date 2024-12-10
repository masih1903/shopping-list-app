import React, { useState } from "react";

function GoodsList({
  goods,
  deleteGoodById,
  addToShoppingList,
  loggedIn,
  updateGood,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

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

  return (
    <div>
      <h1>Vareliste</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Navn</th>
            <th>Handlinger</th>
          </tr>
        </thead>
        <tbody>
          {goods.map((good) => (
            <tr key={good.id}>
              <td>{good.id}</td>
              <td>
                {editingId === good.id ? (
                  <input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                  />
                ) : (
                  good.name
                )}
              </td>
              <td>
                {editingId === good.id ? (
                  <>
                    <button onClick={() => saveEdit(good)} className="save">
                      Gem
                    </button>
                    <button onClick={cancelEdit} className="cancel">
                      Annuller
                    </button>
                  </>
                ) : (
                  <>
                    {loggedIn && (
                      <>
                        <button
                          onClick={() => startEditing(good)}
                          className="edit"
                        >
                          Rediger
                        </button>
                        <button
                          onClick={() => confirmDelete(good.id)}
                          className="delete"
                        >
                          Slet
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => addToShoppingList(good)}
                      className="add-to-cart"
                    >
                      Tilføj til kurv
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GoodsList;
