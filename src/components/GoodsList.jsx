import React, { useState, useMemo } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("name"); // "name", "id", "recent"
  const [viewMode, setViewMode] = useState("cards"); // "cards", "compact"
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  // Simple category detection based on product names
  const detectCategory = (name) => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('frugt') || lowercaseName.includes('grønt') || 
        lowercaseName.includes('æble') || lowercaseName.includes('banan') ||
        lowercaseName.includes('tomat') || lowercaseName.includes('løg')) {
      return 'Frugt & Grønt';
    }
    if (lowercaseName.includes('mælk') || lowercaseName.includes('ost') || 
        lowercaseName.includes('yoghurt') || lowercaseName.includes('smør')) {
      return 'Mejeri';
    }
    if (lowercaseName.includes('kød') || lowercaseName.includes('fisk') || 
        lowercaseName.includes('kylling') || lowercaseName.includes('pølse')) {
      return 'Kød & Fisk';
    }
    if (lowercaseName.includes('brød') || lowercaseName.includes('mel') || 
        lowercaseName.includes('pasta') || lowercaseName.includes('ris')) {
      return 'Bageri & Korn';
    }
    return 'Andet';
  };

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(goods.map(good => detectCategory(good.name)))];
    return cats;
  }, [goods]);

  // Advanced filtering and sorting
  const processedGoods = useMemo(() => {
    let filtered = goods.filter((good) =>
      good.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Category filtering
    if (selectedCategory !== "all") {
      filtered = filtered.filter(good => detectCategory(good.name) === selectedCategory);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "id":
          return a.id - b.id;
        case "recent":
          return b.id - a.id; // Assuming higher ID = more recent
        default:
          return 0;
      }
    });

    return filtered;
  }, [goods, searchTerm, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(processedGoods.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedGoods = processedGoods.slice(startIndex, startIndex + itemsPerPage);

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy, itemsPerPage]);

  return (
    <div>
      <h1>📦 Vareliste</h1>
      
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Søg efter varer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Controls Bar */}
      <div className="list-controls">
        <div className="control-group">
          <label htmlFor="category-filter">Kategori:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="control-select"
          >
            <option value="all">Alle kategorier</option>
            {categories.filter(cat => cat !== 'all').map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="sort-by">Sorter:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="control-select"
          >
            <option value="name">Navn (A-Z)</option>
            <option value="id">ID (Lav-Høj)</option>
            <option value="recent">Nyeste først</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="items-per-page">Vis:</label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="control-select"
          >
            <option value={5}>5 pr. side</option>
            <option value={10}>10 pr. side</option>
            <option value={20}>20 pr. side</option>
            <option value={50}>50 pr. side</option>
          </select>
        </div>

        <div className="control-group">
          <div className="view-toggle">
            <button
              onClick={() => setViewMode("cards")}
              className={`view-toggle-btn ${viewMode === "cards" ? "active" : ""}`}
              title="Kort visning"
            >
              ⊞
            </button>
            <button
              onClick={() => setViewMode("compact")}
              className={`view-toggle-btn ${viewMode === "compact" ? "active" : ""}`}
              title="Kompakt visning"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Results Info */}
      {processedGoods.length > 0 && (
        <div className="results-info">
          Viser {startIndex + 1}-{Math.min(startIndex + itemsPerPage, processedGoods.length)} af {processedGoods.length} varer
          {selectedCategory !== "all" && ` i kategorien "${selectedCategory}"`}
        </div>
      )}

      {/* Items Display */}
      <div className={`items-grid ${viewMode === "compact" ? "compact-view" : ""}`}>
        {paginatedGoods.map((good) => (
          <div key={good.id} className={`item-card ${viewMode === "compact" ? "compact" : ""}`}>
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
                  <div className="item-meta">
                    <span className="item-id">ID: {good.id}</span>
                    <span className="item-category">{detectCategory(good.name)}</span>
                  </div>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            ‹ Forrige
          </button>
          
          <div className="pagination-info">
            Side {currentPage} af {totalPages}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Næste ›
          </button>
        </div>
      )}
      
      {/* Empty State */}
      {processedGoods.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">
            {searchTerm || selectedCategory !== "all" ? '🔍' : '📦'}
          </div>
          <h3 className="empty-state-title">
            {searchTerm || selectedCategory !== "all" ? 'Ingen resultater' : 'Ingen varer'}
          </h3>
          <p className="empty-state-description">
            {searchTerm || selectedCategory !== "all"
              ? 'Ingen varer matcher dine filtre. Prøv at justere søgning eller kategori.' 
              : 'Der er ingen varer tilgængelige endnu.'}
          </p>
        </div>
      )}
    </div>
  );
}

export default GoodsList;
