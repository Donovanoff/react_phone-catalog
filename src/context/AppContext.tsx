import { createContext, useContext } from 'react';
import { CartProduct, LocalStorageKeys, Product } from '../utils/types';
import { useLocalStorage } from '../utils/useLocalStorage';

interface AppContextType {
  cart: CartProduct[];
  favourites: Product[];

  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;

  toggleFavorite: (product: Product) => void;
  increaseQuantity: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
}

const AppContext = createContext<AppContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartProduct[]>(
    LocalStorageKeys.cart,
    [],
  );
  const [favourites, setFavourites] = useLocalStorage<Product[]>(
    LocalStorageKeys.favourites,
    [],
  );

  const addToCart = (product: Product) => {
    const isAlreadyInCart = cart.some((p: Product) => p.id === product.id);

    if (!isAlreadyInCart) {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product: Product) => {
    setCart(cart.filter((p: Product) => p.id !== product.id));
  };

  const toggleFavorite = (product: Product) => {
    const isFavorite = favourites?.some(
      (item: Product) =>
        (item?.id || item?.itemId) === (product?.id || product?.itemId),
    );

    if (isFavorite) {
      setFavourites(
        favourites.filter(
          (item: Product) =>
            (item?.id || item?.itemId) !== (product?.id || product?.itemId),
        ),
      );
    } else {
      setFavourites([...(favourites || []), product]);
    }
  };

  const increaseQuantity = (product: Product) => {
    const newCart = cart.map((p: CartProduct) => {
      if (p.id === product.id) {
        return {
          ...p,
          quantity: p.quantity + 1,
        };
      }

      return p;
    });

    setCart(newCart);
  };

  const decreaseQuantity = (product: Product) => {
    const newCart = cart.map((p: CartProduct) => {
      if (p.id === product.id) {
        return {
          ...p,
          quantity: p.quantity > 1 ? p.quantity - 1 : 1,
        };
      }

      return p;
    });

    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const contextValue: AppContextType = {
    cart,
    favourites,
    addToCart,
    removeFromCart,
    clearCart,
    toggleFavorite,
    increaseQuantity,
    decreaseQuantity,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === null) {
    throw new Error('Error: context === null');
  }

  return context;
};
