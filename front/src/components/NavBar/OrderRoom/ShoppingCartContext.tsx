import React, { createContext, useContext, useState, ReactNode } from 'react';
import { cartItem, office } from '../types/types';

// Interface for Shopping Cart Context Props
interface ShoppingCartContextProps {
    children: ReactNode;
}

// Interface for Shopping Cart Context Values
interface ShoppingCartContextValue {
    cartItems: cartItem[];
    cartCount: number;
    addToCart: (office: office, quantity?: number) => void;
    removeFromCart: (officeId: string) => void;
    clearCart: () => void;
}

const initialShoppingCart: ShoppingCartContextValue = {
    cartItems: [],
    cartCount: 0,
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
};

const ShoppingCartContext = createContext<ShoppingCartContextValue>(initialShoppingCart);

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider: React.FC<ShoppingCartContextProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<cartItem[]>([]);
    const [cartCount, setCartCount] = useState<number>(0);

    const addToCart = (office: office, quantity: number = 1) => {
        setCartItems(prevCartItems => {
            const existingItem = prevCartItems.find(item => item.office.id === office.id);
            if (existingItem) {
                return prevCartItems.map(item =>
                    item.office.id === office.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                setCartCount(prevCount => prevCount + 1); // Update cart count
                return [...prevCartItems, { id: office.id, quantity, office }];
            }
        });
    };

    const removeFromCart = (officeId: string) => {
        setCartItems(prevCartItems => prevCartItems.filter(item => item.office.id !== officeId));
        setCartCount(prevCount => prevCount - 1); // Update cart count
    };

    const clearCart = () => {
        setCartItems([]);
        setCartCount(0); // Clear cart count
        localStorage.removeItem('cartItems'); // Optionally, clear local storage if used
    };

    const contextValue: ShoppingCartContextValue = {
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        clearCart,
    };

    return (
        <ShoppingCartContext.Provider value={contextValue}>
            {children}
        </ShoppingCartContext.Provider>
    );
};




// cartItems.map((currItem) => {
// currItem.office.id === cartItem.office.id ? { ...currItem, quantity: cartItem.quantity - 1 } : currItem
