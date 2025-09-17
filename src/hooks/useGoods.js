import { useState, useEffect } from 'react';
import facade from '../utils/apiFacade';
import { detectCategory } from '../utils/categoryUtils';
import { API_CONFIG, ERROR_MESSAGES } from '../utils/constants';

/**
 * Custom hook for managing goods data and operations
 */
export const useGoods = (loggedIn) => {
  const [goods, setGoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch goods on mount and when login status changes
  useEffect(() => {
    const fetchGoods = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await facade.fetchData(API_CONFIG.ENDPOINTS.PRODUCTS);
        setGoods(data);
      } catch (err) {
        console.error('Failed to fetch goods:', err);
        setError(ERROR_MESSAGES.FETCH_PRODUCTS_FAILED);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoods();
  }, [loggedIn]);

  const deleteGood = async (goodId) => {
    if (!loggedIn) return;
    
    try {
      await facade.fetchData(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${goodId}`, 'DELETE');
      setGoods(prevGoods => prevGoods.filter(good => good.id !== goodId));
    } catch (err) {
      console.error('Failed to delete good:', err);
      setError(ERROR_MESSAGES.DELETE_PRODUCT_FAILED);
    }
  };

  const updateGood = async (good) => {
    try {
      const updatedGood = await facade.fetchData(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${good.id}`, 'PUT', good);
      setGoods(prevGoods =>
        prevGoods.map(g => (g.id === updatedGood.id ? updatedGood : g))
      );
    } catch (err) {
      console.error('Failed to update good:', err);
      setError(ERROR_MESSAGES.UPDATE_PRODUCT_FAILED);
    }
  };

  const createGood = async (good) => {
    try {
      const { id, ...newGood } = good;
      const createdGood = await facade.fetchData(API_CONFIG.ENDPOINTS.PRODUCTS, 'POST', newGood);
      setGoods(prevGoods => [...prevGoods, createdGood]);
      
      // Log the detected category for user feedback (frontend-only)
      const detectedCategory = detectCategory(createdGood.name);
      console.log(`✅ Added "${createdGood.name}" to category: ${detectedCategory}`);
      
      return createdGood;
    } catch (err) {
      console.error('Failed to create good:', err);
      setError(ERROR_MESSAGES.CREATE_PRODUCT_FAILED);
      throw err;
    }
  };

  const mutateGood = async (good) => {
    if (good.id !== '') {
      return updateGood(good);
    } else {
      return createGood(good);
    }
  };

  return {
    goods,
    isLoading,
    error,
    deleteGood,
    updateGood,
    createGood,
    mutateGood,
    setError
  };
};
