import { useState, useEffect } from 'react';
import facade from '../utils/apiFacade';
import { API_CONFIG, ERROR_MESSAGES } from '../utils/constants';

/**
 * Custom hook for managing shopping list data and operations
 */
export const useShoppingList = () => {
  const [shoppings, setShoppings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch shopping lists on mount
  useEffect(() => {
    const fetchShoppingLists = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await facade.fetchData(API_CONFIG.ENDPOINTS.SHOPPING_LISTS);
        setShoppings(data);
      } catch (err) {
        console.error('Failed to fetch shopping lists:', err);
        setError(ERROR_MESSAGES.FETCH_SHOPPING_LIST_FAILED);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShoppingLists();
  }, []);

  const addToShoppingList = async (good) => {
    try {
      const newShoppingItem = await facade.fetchData(API_CONFIG.ENDPOINTS.SHOPPING_LISTS, 'POST', good);
      setShoppings(prevShoppings => [...prevShoppings, newShoppingItem]);
    } catch (err) {
      console.error('Failed to add to shopping list:', err);
      setError(ERROR_MESSAGES.ADD_TO_CART_FAILED);
    }
  };

  const removeFromShoppingList = async (goodId) => {
    try {
      await facade.fetchData(`${API_CONFIG.ENDPOINTS.SHOPPING_LISTS}/${goodId}`, 'DELETE');
      setShoppings(prevShoppings =>
        prevShoppings.filter(shopping => shopping.id !== goodId)
      );
    } catch (err) {
      console.error('Failed to delete from shopping list:', err);
      setError(ERROR_MESSAGES.REMOVE_FROM_CART_FAILED);
    }
  };

  return {
    shoppings,
    isLoading,
    error,
    addToShoppingList,
    removeFromShoppingList,
    setError
  };
};
