import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PayMent.css';
import moment from 'moment';
import { useShoppingCart } from '../ShoppingCartContext';

// Define the Office and Event interfaces
interface Office {
    id: number;
    officeName: string;
    rent_price: number;
    location: string;
    capacity: number;
    picture: string;
}

interface Event {
    id: number;
    start: moment.MomentInput;
    end: moment.MomentInput;
}

export default function PayMent() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { events, office } = state as { events: Event[]; office: Office } || {};
    const [orderCompleted, setOrderCompleted] = useState(false);
    const [error, setError] = useState('');
    const { clearCart } = useShoppingCart();

    useEffect(() => {
        if (!office || !events) {
            setError('No booking details available');
        }
    }, [office, events]);

    const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const paymentDetails = {
            userId: 1, // Replace with actual user ID
            officeId: office?.id,
            cardNumber: formData.get('cardNumber'),
            validityMonth: formData.get('validityMonth'),
            CVV: formData.get('cvv'),
            createdAt: new Date().toISOString()
        };

        try {
            const response = await fetch('http://localhost:3001/auth/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentDetails),
            });

            if (!response.ok) {
                throw new Error('Payment failed');
            }

            const result = await response.json();
            setOrderCompleted(true);
            setError('');

            setTimeout(() => {
                clearCart(); // Clear the cart
                navigate('/home');
            }, 4000);
        } catch (err) {
            console.error('Error making payment', err);
            setError('The user does not exist, so the office cannot be ordered. Please login or register on the site');
        }
    };

    return (
        <div className='PayMent'>
            <div className='quiz'>
                <form onSubmit={handleOrderSubmit}>
                    <div>
                        <h4>First Name</h4>
                        <input type="text" name='firstName' placeholder='First Name:' required />
                    </div>
                    <div>
                        <h4>Last Name</h4>
                        <input type="text" name='lastName' placeholder='Last Name:' required />
                    </div>
                    <div>
                        <h4>Card Number</h4>
                        <input type="text" name="cardNumber" pattern='\d{16}' inputMode='numeric' maxLength={16} placeholder='Card Number:' required />
                    </div>
                    <div>
                        <h4>Validity</h4>
                        <input type="month" name="validityMonth" required />
                    </div>
                    <div>
                        <h4>CVV</h4>
                        <input type="text" name="cvv" maxLength={3} placeholder='CVV:' required />
                    </div>
                    <div>
                        <button type="submit">Order Now</button>
                    </div>
                </form>
            </div>
            <div className='imgSale'>
                <img src="https://t4.ftcdn.net/jpg/06/16/99/51/360_F_616995128_xWAth0i92Adkm4A9b6RGXCnO5yocUmnU.jpg" alt="office" />
                {error && <p className="error-message">{error}</p>}
                {orderCompleted && (
                    <p className="success-message">The order was successfully completed!</p>
                )}
            </div>
            <div className='bookDetails'>
                <h2>Booking Details</h2>
                {office && events && events.length > 0 ? (
                    <div>
                        <h3>Office: {office.officeName}</h3>
                        <h4>Price: {office.rent_price}</h4>
                        <h4>Location: {office.location}</h4>
                        <h4>Capacity: 1{office.capacity}</h4>
                        <img src={office.picture} alt={office.officeName} />
                        {events.map((event: Event) => (
                            <div key={event.id}>
                                <p>Date: {moment(event.start).format('DD-MM-YYYY')} - {moment(event.end).format('DD-MM-YYYY')}</p>
                                <p>Time: {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No current booking details available</p>
                )}
            </div>
        </div>
    );
}




// =============================================
// import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './PayMent.css';
// import React from 'react';
// import { useShoppingCart } from '../ShoppingCartContext'; // Import the shopping cart context
// import moment from 'moment'; // Make sure to adjust the import paths if necessary

// export default function PayMent() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { clearCart, cartItems } = useShoppingCart(); // Access clearCart and cartItems from context
//     const [orderCompleted, setOrderCompleted] = useState(false);

//     const handleOrderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setOrderCompleted(true);

//         clearCart();

//         setTimeout(() => {
//             navigate('/home');
//         }, 4000);
//     };

//     return (
//         <div className='PayMent'>
//             <form onSubmit={handleOrderSubmit}>
//                 <div className='quiz'>
//                     <div>
//                         <h4>First Name</h4>
//                         <input type="text" name='First Name' id='id' placeholder='First Name:' required />
//                     </div>
//                     <div>
//                         <h4>Last Name</h4>
//                         <input type="text" name='Last Name' id='id' placeholder='Last Name:' required />
//                     </div>
//                     <div>
//                         <h4>Card Number</h4>
//                         <input type="password" name="password" id="id" pattern='[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}' inputMode='numeric' maxLength={16} spellCheck="false" minLength={16} placeholder='Card Number:' required />
//                     </div>
//                     <div>
//                         <h4>Validity</h4>
//                         <input type="month" name="month" id="id" required />
//                     </div>
//                     <div>
//                         <h4>CVV</h4>
//                         <input type="password" name="cvv" id="id" maxLength={3} placeholder='CVV:' required />
//                     </div>
//                     <div>
//                         <button type="submit" value="Submit">Order Now</button>
//                     </div>
//                 </div>
//             </form>
//             <div className='imgSale'>
//                 <img src="https://t4.ftcdn.net/jpg/06/16/99/51/360_F_616995128_xWAth0i92Adkm4A9b6RGXCnO5yocUmnU.jpg" alt="office" />
//             </div>
//             {orderCompleted && (
//                 <div className="popup">
//                     <span className="popuptext">The order was successfully completed!</span>
//                 </div>
//             )}
//             <div className='bookDetails'>
//                 <h2>Booking Details</h2>
//                 {cartItems && cartItems.length > 0 ? (
//                     <div>
//                         {cartItems.map((item, index) => (
//                             <div key={index}>
//                                 <h3>Office: {item.office.officeName}</h3>
//                                 <h4>Price: {item.office.rent_price}</h4>
//                                 <h4>Location: {item.office.location}</h4>
//                                 <h4>Capacity: 1{item.office.capacity}</h4>
//                                 <h4>Quantity: {item.quantity}</h4>
//                                 <img src={item.office.picture} alt={item.office.officeName} />
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p>No items in the cart</p>
//                 )}
//             </div>
//         </div>
//     );
// }




