import React, { createContext, useContext, useState, ReactNode } from 'react';
import { offices } from '../types/types';

// Interface for Shopping Cart Context Props
interface ShoppingCartContextProps {
    children: ReactNode;
}

// Interface for Shopping Cart Context Values
interface ShoppingCartContextValue {
    cartItems: { id: string; quantity: number; office: offices }[];
    addToCart: (item: offices, quantity?: number) => void;
    removeFromCart: (officesId: string) => void;
}

const initialShoppingCart: ShoppingCartContextValue = {
    cartItems: [],
    addToCart: () => { },
    removeFromCart: () => { },
};

const ShoppingCartContext = createContext(initialShoppingCart);

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider: React.FC<ShoppingCartContextProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<{ id: string; quantity: number; office: offices }[]>([]);

    const addToCart = (item: offices, quantity = 1) => {
        setCartItems(prevCartItems => {
            const existingItem = prevCartItems.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevCartItems.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
                );
            } else {
                return [...prevCartItems, { id: item.id, quantity, office: item }];
            }
        });
    };

    const removeFromCart = (officesId: string) => {
        setCartItems(cartItems.filter((item) => item.id !== officesId));
    };

    const contextValue: ShoppingCartContextValue = {
        cartItems,
        addToCart,
        removeFromCart,
    };

    return (
        <ShoppingCartContext.Provider value={contextValue}>
            {children}
        </ShoppingCartContext.Provider>
    );
};