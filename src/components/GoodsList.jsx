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
      <input
        type="text"
        placeholder="Søg efter varer..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "50%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Navn</th>
            <th>Handlinger</th>
          </tr>
        </thead>
        <tbody>
          {filteredGoods.map((good) => (
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
                    <button style= {{marginLeft: "10px"}} onClick={() => saveEdit(good)} className="save">
                      <SaveLogo />
                    </button>
                    <button onClick={cancelEdit} className="cancel">
                      <CancelLogo />
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
                          <EditLogo />
                        </button>
                        <button
                          onClick={() => confirmDelete(good.id)}
                          className="delete"
                        >
                          <Trashcan />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => addToShoppingList(good)}
                      className="add-to-cart"
                    >
                      <Shoppingcart />
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
