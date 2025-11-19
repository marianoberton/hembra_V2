'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { TiendanubeProduct } from '../../types/tiendanube';

export interface CartItem {
  id: number;
  product: TiendanubeProduct;
  quantity: number;
  selectedVariant?: unknown;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: TiendanubeProduct; quantity: number; variant?: unknown } }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: TiendanubeProduct, quantity: number, variant?: unknown) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getItemPrice: (item: CartItem) => number;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, variant } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id && 
        JSON.stringify(item.selectedVariant) === JSON.stringify(variant)
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Actualizar cantidad del item existente
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Agregar nuevo item
        const newItem: CartItem = {
          id: Date.now(), // ID único temporal
          product,
          quantity,
          selectedVariant: variant
        };
        newItems = [...state.items, newItem];
      }

      return calculateTotals({ ...state, items: newItems });
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      return calculateTotals({ ...state, items: newItems });
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id } });
      }

      const newItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      return calculateTotals({ ...state, items: newItems });
    }

    case 'CLEAR_CART': {
      return { items: [], total: 0, itemCount: 0 };
    }

    case 'LOAD_CART': {
      return action.payload;
    }

    default:
      return state;
  }
}

function calculateTotals(state: CartState): CartState {
  const total = state.items.reduce((sum, item) => {
    const firstVariant = item.product.variants?.[0];
    const price = firstVariant?.promotional_price || firstVariant?.price || '0';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return sum + (numPrice * item.quantity);
  }, 0);

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return { ...state, total, itemCount };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0
  });

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (product: TiendanubeProduct, quantity: number, variant?: unknown) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, variant } });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemPrice = (item: CartItem): number => {
    const firstVariant = item.product.variants?.[0];
    const price = firstVariant?.promotional_price || firstVariant?.price || '0';
    return typeof price === 'string' ? parseFloat(price) : price;
  };

  return (
    <CartContext.Provider value={{
      state,
      dispatch,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}