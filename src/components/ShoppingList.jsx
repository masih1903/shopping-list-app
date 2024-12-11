import Trashcan from "../SvgComponent/Trashcan";

function ShoppingList({ shoppings, deleteGoodFromShoppingListById }) {
  return (
    <div>
      <h1>Indkøbskurv</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Navn</th>
            <th>Handlinger</th>
          </tr>
        </thead>
        <tbody>
          {shoppings.map((shop) => (
            <tr key={shop.id}>
              <td>{shop.id}</td>
              <td>{shop.name}</td>
              <td>
                <button
                  className="delete"
                  onClick={() => deleteGoodFromShoppingListById(shop.id)}
                >
                  <Trashcan />
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
