# Shopping List App

A modern, responsive shopping list application built with React that provides an intuitive interface for managing products and shopping lists.

## Features

- 🔐 **Authentication System** - Login/logout functionality with JWT token management
- 📦 **Product Management** - Add, edit, delete, and categorize products (admin users)
- 🛒 **Shopping Cart** - Add items to shopping list and manage cart
- 🔍 **Search & Filter** - Search products and filter by categories
- 📱 **Responsive Design** - Modern UI that works on all devices
- 🌓 **Dark/Light Theme** - Toggle between themes with system preference detection
- 📊 **Category Auto-detection** - Products are automatically categorized based on keywords

## Technology Stack

- **React 18** - Modern React with functional components and hooks
- **Vite** - Fast build tool and development server
- **Custom Hooks** - Separated business logic for better code organization
- **CSS3** - Modern styling with CSS variables and responsive design
- **RESTful API** - Integration with external product API

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx      # Standardized button component
│   ├── Header.jsx      # Application header
│   ├── Icons.jsx       # Consolidated icon system
│   ├── GoodsForm.jsx   # Product form component
│   ├── GoodsList.jsx   # Product list with pagination and filters
│   ├── ShoppingList.jsx # Shopping cart component
│   ├── LogIn.jsx       # Authentication form
│   ├── ThemeToggle.jsx # Theme switcher
│   └── index.js        # Component exports
├── hooks/              # Custom React hooks
│   ├── useAuth.js      # Authentication state management
│   ├── useGoods.js     # Product data management
│   ├── useShoppingList.js # Shopping cart management
│   └── index.js        # Hook exports
├── context/            # React context providers
│   └── ThemeContext.jsx # Theme management
├── utils/              # Utility functions
│   ├── apiFacade.js    # API communication layer
│   ├── categoryUtils.js # Product categorization logic
│   └── constants.js    # Application constants
└── styles/
    └── App.css         # Application styles
```

## API Integration

- **REST API**: https://productapi.cphmk.dk/api/routes
- **Live Demo**: https://buy.cphmk.dk/

## Key Improvements Made

### 🛠️ Code Quality
- **Separated Concerns**: Business logic moved to custom hooks
- **Reusable Components**: Standardized Button and Icon components
- **Consistent Styling**: Unified design system with CSS variables
- **Type Safety**: Proper prop validation and error handling

### 🚀 Performance
- **Optimized Rendering**: Proper use of React.memo and useMemo
- **Efficient State Management**: Reduced unnecessary re-renders
- **Lazy Loading**: Components load only when needed

### 📦 Maintainability
- **Modular Architecture**: Clear separation of components, hooks, and utilities
- **Centralized Constants**: All configuration in one place
- **Consistent Error Handling**: Standardized error messages and handling
- **Clean Dependencies**: Removed unused packages

### 🎨 User Experience
- **Modern UI**: Clean, intuitive interface design
- **Accessibility**: Proper focus management and ARIA attributes
- **Responsive**: Works seamlessly on all device sizes
- **Theme Support**: System-aware dark/light mode switching

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Start JSON server** (for local development):
   ```bash
   npm run jsonserver
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run jsonserver` - Start local JSON server

## Contributing

This codebase follows modern React best practices with:
- Functional components with hooks
- Custom hooks for business logic
- Consistent code organization
- Proper error handling
- Responsive design principles
