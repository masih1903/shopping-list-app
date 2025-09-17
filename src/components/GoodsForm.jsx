import React, { useEffect, useState } from "react";
import Button from "./Button";
import { PlusIcon, ResetIcon, SaveIcon } from "./Icons";
import { detectCategory } from "../utils/categoryUtils";

function GoodsForm({ goodToEdit, mutateGood, resetForm, isEditing }) {
  const [good, setGood] = useState({ id: "", name: "" });
  const [predictedCategory, setPredictedCategory] = useState("");

  useEffect(() => {
    setGood(goodToEdit);
  }, [goodToEdit]);

  function handleChange(event) {
    const { id, value } = event.target;
    setGood({ ...good, [id]: value });
    
    // Update predicted category when name changes
    if (id === "name") {
      const category = detectCategory(value);
      setPredictedCategory(category);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    mutateGood(good);
    setGood({ id: "", name: "" });
    setPredictedCategory("");
    resetForm();
  }

  function handleReset() {
    setGood({ id: "", name: "" });
    setPredictedCategory("");
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
          {predictedCategory && good.name && (
            <div className="category-preview">
              <span className="category-label">📂 Forudsagt kategori:</span>
              <span className="category-value">{predictedCategory}</span>
            </div>
          )}
        </div>
        
        <div className="form-row">
          <Button
            type="submit"
            variant={isEditing ? "save" : "primary"}
            icon={isEditing ? SaveIcon : PlusIcon}
          >
            {isEditing ? "Opdater vare" : "Tilføj vare"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            icon={ResetIcon}
            onClick={handleReset}
          >
            Ryd
          </Button>
        </div>
      </form>
    </div>
  );
}

export default GoodsForm;
