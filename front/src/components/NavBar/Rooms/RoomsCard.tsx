import React, { useState } from 'react';
import './RoomsCard.css';
import { offices } from '../types/types';
import { useShoppingCart } from '../OrderRoom/ShoppingCartContext';
import { To, useNavigate } from 'react-router-dom';

export default function RoomsCard(props: { theRoomsOfCard: offices; changeColor: string }) {
    const [theinfoCard, settheinfoCard] = useState<boolean>(false);

    const navigate = useNavigate();
    const navigateToNewPage = (pagePath: To) => {
        navigate(pagePath);
    };

    const { addToCart } = useShoppingCart();

    const handleAddToCart = () => {
        addToCart(props.theRoomsOfCard, 1); // Add room with quantity 1
    };

    return (
        <div className='RoomsCard' style={{ backgroundColor: props.changeColor }} onMouseEnter={() => settheinfoCard(true)} onMouseLeave={() => settheinfoCard(false)}>
            <div>
                <img src={props.theRoomsOfCard.picture} alt={props.theRoomsOfCard.officeName} />
                <h3>Office Name: {props.theRoomsOfCard.officeName}</h3>
                <h3>Price: {props.theRoomsOfCard.rent_price}</h3>
                <h3>Location: {props.theRoomsOfCard.location}</h3>
                <h3>Capacity: 1{props.theRoomsOfCard.capacity}</h3>
            </div>
            <div className={theinfoCard ? 'infoCard shw' : 'infoCard hdn'}>
                <h4>{props.theRoomsOfCard.officeName}</h4>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
}