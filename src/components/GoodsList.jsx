import React, { useState, useMemo } from "react";
import Button from "./Button";
import { ShoppingCartIcon, EditIcon, TrashIcon, SaveIcon, CancelIcon } from "./Icons";
import { detectCategory } from "../utils/categoryUtils";
import { UI_TEXT } from "../utils/constants";

function GoodsList({
  goods,
  shoppings,
  deleteGoodById,
  addToShoppingList,
  loggedIn,
  updateGood,
  resetToDefaults,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("name"); // "name", "id", "recent"
  const [viewMode, setViewMode] = useState("cards"); // "cards", "compact"
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [addingToCart, setAddingToCart] = useState(null); // Track which item is being added
  const [recentlyAdded, setRecentlyAdded] = useState(new Set()); // Track recently added items
  const [showSuccessToast, setShowSuccessToast] = useState(null); // Show success message
  const [showWarningToast, setShowWarningToast] = useState(null); // Show warning message for duplicates

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
    const isConfirmed = window.confirm(UI_TEXT.CONFIRM_DELETE);
    if (isConfirmed) {
      deleteGoodById(goodId);
    }
  };

  // Check if item is already in shopping cart
  const isItemInCart = (goodId) => {
    return shoppings.some(shopping => shopping.id === goodId);
  };

  const handleAddToCart = async (good) => {
    // Check if item is already in cart
    if (isItemInCart(good.id)) {
      // Show warning notification
      setShowWarningToast(good.name);
      
      // Hide warning toast after 3 seconds
      setTimeout(() => {
        setShowWarningToast(null);
      }, 3000);
      
      return; // Don't proceed with adding to cart
    }

    try {
      // Set loading state for this specific item
      setAddingToCart(good.id);
      
      // Call the add to shopping list function
      await addToShoppingList(good);
      
      // Add to recently added set for visual feedback
      setRecentlyAdded(prev => new Set([...prev, good.id]));
      
      // Show success toast
      setShowSuccessToast(good.name);
      
      // Remove from recently added after animation duration
      setTimeout(() => {
        setRecentlyAdded(prev => {
          const newSet = new Set(prev);
          newSet.delete(good.id);
          return newSet;
        });
      }, 2000); // 2 seconds visual feedback
      
      // Hide success toast
      setTimeout(() => {
        setShowSuccessToast(null);
      }, 3000);
      
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      // Clear loading state
      setAddingToCart(null);
    }
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

  // Reset all filters and states when resetToDefaults changes
  React.useEffect(() => {
    if (resetToDefaults) {
      setEditingId(null);
      setEditingValue("");
      setSearchTerm("");
      setCurrentPage(1);
      setItemsPerPage(5);
      setSortBy("name");
      setViewMode("cards");
      setSelectedCategory("all");
      setAddingToCart(null);
      setRecentlyAdded(new Set());
      setShowSuccessToast(null);
      setShowWarningToast(null);
    }
  }, [resetToDefaults]);

  return (
    <div>
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="success-toast">
          <span className="toast-icon">✅</span>
          <span className="toast-message">
            "{showSuccessToast}" tilføjet til kurv!
          </span>
        </div>
      )}

      {/* Warning Toast */}
      {showWarningToast && (
        <div className="warning-toast">
          <span className="toast-icon">⚠️</span>
          <span className="toast-message">
            "{showWarningToast}" er allerede i kurven!
          </span>
        </div>
      )}
      
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
          <div 
            key={good.id} 
            className={`
              item-card 
              ${viewMode === "compact" ? "compact" : ""}
              ${recentlyAdded.has(good.id) ? "item-card-success" : ""}
            `.trim()}
          >
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
                  <div className="item-name-container">
                    <h3 className="item-name">{good.name}</h3>
                    {isItemInCart(good.id) && (
                      <span className="in-cart-badge" title="Allerede i kurven">
                        🛒
                      </span>
                    )}
                  </div>
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
                  <Button
                    variant="save"
                    size="icon"
                    onClick={() => saveEdit(good)}
                    title="Gem ændringer"
                    icon={SaveIcon}
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={cancelEdit}
                    title="Annuller"
                    icon={CancelIcon}
                  />
                </div>
              ) : (
                <div className="button-group">
                  {loggedIn && (
                    <>
                      <Button
                        variant="edit"
                        size="icon"
                        onClick={() => startEditing(good)}
                        title="Rediger vare"
                        icon={EditIcon}
                      />
                      <Button
                        variant="danger"
                        size="icon"
                        onClick={() => confirmDelete(good.id)}
                        title="Slet vare"
                        icon={TrashIcon}
                      />
                    </>
                  )}
                  <Button
                    variant={isItemInCart(good.id) ? "secondary" : "primary"}
                    size="icon"
                    onClick={() => handleAddToCart(good)}
                    title={
                      addingToCart === good.id 
                        ? "Tilføjer til kurv..." 
                        : isItemInCart(good.id)
                        ? "Allerede i kurven - klik for at se besked"
                        : recentlyAdded.has(good.id)
                        ? "Tilføjet til kurv!"
                        : "Tilføj til indkøbskurv"
                    }
                    icon={ShoppingCartIcon}
                    disabled={addingToCart === good.id}
                    className={`
                      ${addingToCart === good.id ? 'adding-to-cart' : ''}
                      ${recentlyAdded.has(good.id) ? 'recently-added' : ''}
                      ${isItemInCart(good.id) ? 'already-in-cart' : ''}
                    `.trim()}
                  />
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
