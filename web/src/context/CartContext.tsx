import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { createCart, addToCart, getCart, updateCartItem, removeFromCart, type Cart } from '../lib/shopify';

interface CartContextType {
  cart: Cart | null;
  isCartOpen: boolean;
  itemCount: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize cart from localStorage
  useEffect(() => {
    const initializeCart = async () => {
      const storedCartId = localStorage.getItem('shopify_cart_id');
      if (storedCartId) {
        try {
          const existingCart = await getCart(storedCartId);
          if (existingCart) {
            setCart(existingCart);
          } else {
            // Cart might have expired or been checked out
            localStorage.removeItem('shopify_cart_id');
          }
        } catch (error) {
          console.error('Error fetching existing cart:', error);
        }
      }
    };
    initializeCart();
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addItem = async (variantId: string, quantity: number) => {
    setIsLoading(true);
    try {
      if (cart?.id) {
        // Add to existing cart
        const updatedCart = await addToCart(cart.id, variantId, quantity);
        setCart(updatedCart);
      } else {
        // Create new cart
        const newCart = await createCart(variantId, quantity);
        setCart(newCart);
        localStorage.setItem('shopify_cart_id', newCart.id);
      }
      openCart(); // Automatically slide out the drawer when an item is added
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to tote. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (lineId: string, quantity: number) => {
    if (!cart?.id) return;
    setIsLoading(true);
    try {
      const updatedCart = await updateCartItem(cart.id, lineId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error updating cart item:', error);
      alert('Failed to update item quantity.');
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cart?.id) return;
    setIsLoading(true);
    try {
      const updatedCart = await removeFromCart(cart.id, lineId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error removing cart item:', error);
      alert('Failed to remove item.');
    } finally {
      setIsLoading(false);
    }
  };

  const itemCount = cart?.lines.edges.reduce((total, edge) => total + edge.node.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, isCartOpen, itemCount, openCart, closeCart, addItem, updateItem, removeItem, isLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
