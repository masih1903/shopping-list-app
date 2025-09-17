import React, { useEffect, useState } from "react";
import PlusLogo from "../SvgComponent/PlusLogo";
import ResetLogo from "../SvgComponent/ResetLogo";
import SaveLogo from "../SvgComponent/SaveLogo";

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
      <h1>➕ Tilføj ny vare</h1>
      
      <form onSubmit={handleSubmit} className="form-container">
        <input id="id" type="hidden" value={good.id || ""} readOnly />
        
        <div>
          <label htmlFor="name">Varenavn</label>
          <input
            id="name"
            type="text"
            placeholder="Angiv varenavn..."
            value={good.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row">
          <button className="add-to-cart" type="submit">
            {isEditing ? (
              <>
                <SaveLogo />
                Opdater vare
              </>
            ) : (
              <>
                <PlusLogo />
                Tilføj vare
              </>
            )}
          </button>
          <button className="cancel" type="button" onClick={handleReset}>
            <ResetLogo />
            Ryd
          </button>
        </div>
      </form>
    </div>
  );
}

export default GoodsForm;
