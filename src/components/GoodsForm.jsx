import React, { useEffect, useState } from "react";
import PlusLogo from "../SvgComponent/PlusLogo";
import ResetLogo from "../SvgComponent/ResetLogo";

function GoodsForm({ goodToEdit, mutateGood, resetForm, isEditing }) {
  const [good, setGood] = useState({ id: "", name: "" });

  useEffect(() => {
    setGood(goodToEdit);
  }, [goodToEdit]);

  function handleChange(event) {
    const { id, value } = event.target;
    setGood({ ...good, [id]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    mutateGood(good);
    setGood({ id: "", name: "" });
    resetForm();
  }

  function handleReset() {
    setGood({ id: "", name: "" });
    resetForm();
  }

  return (
    <div>
      <h1>{isEditing ? "Tilføj vare" : "Tilføj vare"}</h1>
      <form onSubmit={handleSubmit}>
        <input id="id" type="hidden" value={good.id || ""} readOnly />
        <label htmlFor="name">Navn</label>
        <input
          style={{ width: "70%", marginRight: "10px" }}
          id="name"
          type="text"
          placeholder="Angiv vare"
          value={good.name || ""}
          onChange={handleChange}
        />
        <button className="add-to-cart" type="submit">
          {isEditing ? "Opdater" : <PlusLogo />}
        </button>
        <button className="delete" type="button" onClick={handleReset}>
          <ResetLogo />
        </button>
      </form>
    </div>
  );
}

export default GoodsForm;
