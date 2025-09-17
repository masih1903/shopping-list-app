import Button from "./Button";
import { TrashIcon } from "./Icons";

function ShoppingList({ shoppings, deleteGoodFromShoppingListById }) {
  return (
    <div>
      <h1>🛒 Indkøbskurv</h1>
      
      {shoppings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h3 className="empty-state-title">Din indkøbskurv er tom</h3>
          <p className="empty-state-description">
            Tilføj varer fra listen til venstre for at begynde at handle
          </p>
        </div>
      ) : (
        <div className="shopping-list-container">
          <div style={{ 
            marginBottom: '1rem', 
            padding: '0.75rem 1rem',
            background: 'rgba(102, 126, 234, 0.1)',
            borderRadius: '8px',
            color: '#4a5568',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            {shoppings.length} vare{shoppings.length !== 1 ? 'r' : ''} i kurven
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {shoppings.map((shop) => (
              <div key={shop.id} className="shopping-item">
                <div>
                  <div className="shopping-item-name">{shop.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#718096' }}>
                    ID: {shop.id}
                  </div>
                </div>
                <Button
                  variant="danger"
                  size="icon"
                  onClick={() => deleteGoodFromShoppingListById(shop.id)}
                  title="Fjern fra kurv"
                  icon={TrashIcon}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingList;
