/**
 * Application constants
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://productapi.cphmk.dk/api',
  ENDPOINTS: {
    PRODUCTS: 'products',
    SHOPPING_LISTS: 'shoppinglists',
    AUTH_LOGIN: 'auth/login'
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  JWT_TOKEN: 'jwtToken',
  THEME: 'theme'
};

// Default Values
export const DEFAULTS = {
  BLANK_GOOD: {
    id: '',
    name: ''
  },
  PAGINATION: {
    ITEMS_PER_PAGE: 5,
    DEFAULT_PAGE: 1
  }
};

// Error Messages
export const ERROR_MESSAGES = {
  LOGIN_FAILED: 'Forkert brugernavn eller kodeord. Prøv igen.',
  FETCH_PRODUCTS_FAILED: 'Failed to load products',
  FETCH_SHOPPING_LIST_FAILED: 'Failed to load shopping list',
  CREATE_PRODUCT_FAILED: 'Failed to create product',
  UPDATE_PRODUCT_FAILED: 'Failed to update product',
  DELETE_PRODUCT_FAILED: 'Failed to delete product',
  ADD_TO_CART_FAILED: 'Failed to add item to shopping list',
  REMOVE_FROM_CART_FAILED: 'Failed to remove item from shopping list'
};

// UI Text
export const UI_TEXT = {
  CONFIRM_DELETE: 'Er du sikker på, at du vil slette denne vare?'
};
