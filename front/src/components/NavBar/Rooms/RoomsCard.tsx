import React, { useState } from 'react';
import './RoomsCard.css';
import { office } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../OrderRoom/ShoppingCartContext';

export default function RoomsCard(props: { theRoomOfCard: office; changeColor: string }) {
    const [theInfoCard, setTheInfoCard] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const { addToCart } = useShoppingCart();

    const navigate = useNavigate();

    const handleGoToCalendar = () => {
        // Add to cart and show success message
        addToCart(props.theRoomOfCard, 1); // Add room with quantity 1
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 4000);

        // Navigate to calendar
        navigate(`/calendar/${props.theRoomOfCard.id}`, { state: { office: props.theRoomOfCard } });
    };

    return (
        <div className='RoomsCard' style={{ backgroundColor: props.changeColor }} onMouseEnter={() => setTheInfoCard(true)} onMouseLeave={() => setTheInfoCard(false)}>
            <div>
                <img src={props.theRoomOfCard.picture} alt={props.theRoomOfCard.officeName} />
                <h3>Office Name: {props.theRoomOfCard.officeName}</h3>
                <h3>Price: {props.theRoomOfCard.rent_price}</h3>
                <h3>Location: {props.theRoomOfCard.location}</h3>
                <h3>Capacity: 1{props.theRoomOfCard.capacity}</h3>
            </div>
            <div className={theInfoCard ? 'infoCard shw' : 'infoCard hdn'}>
                <h4>{props.theRoomOfCard.officeName}</h4>
                <button onClick={handleGoToCalendar}>Choose day and time</button>
                {showMessage && <p>Successfully added to the cart</p>}
            </div>
        </div>
    );
}




// ==========================================

// const { addToCart } = useShoppingCart();

// const handleAddToCart = () => {
//     addToCart(props.theRoomsOfCard, 1); // Add room with quantity 1
//     setShowMessage(true);
//     setTimeout(() => {
//         setShowMessage(false);
//     }, 4000);
// };
