function ShoppingList({ shoppings, deleteGoodFromShoppingListById }) {
  return (
    <div>
      <h1>Indkøbsliste</h1>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Aktivitet</th>
          </tr>
        </thead>
        <tbody>
          {shoppings.map((shop) => (
            <tr key={shop.id}>
              <td>{shop.name}</td>
              <td>
                <button
                  className="delete"
                  onClick={() => deleteGoodFromShoppingListById(shop.id)}
                >
                  Slet
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShoppingList;
