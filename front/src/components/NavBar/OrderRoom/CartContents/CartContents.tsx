import { useEffect, useState } from 'react';
import { useShoppingCart } from '../ShoppingCartContext'
import './CartContents.css'
import { Link, To, useNavigate } from 'react-router-dom';
import { offices } from '../../types/types';


const Cart = () => {
    const [theArrRooms, setTheArrRooms] = useState<offices[]>([]);

    const { cartItems, removeFromCart } = useShoppingCart();

    const navigate = useNavigate();

    const navigateToCalendar = (office: offices) => {
        navigate('/calendar', { state: { office } });
    };

    const handleRemoveFromCart = (officesId: string) => {
        removeFromCart(officesId);
    };


    useEffect(() => {
        let url = 'http://localhost:3001/office';
        fetch(url)
            .then((dataAsApi) => dataAsApi.json())
            .then((dataAsObj) => {
                setTheArrRooms(dataAsObj.recordset);
            })
            .catch((error) => {
                console.error('Error fetching rooms:', error);
            });
    }, []);
    return (
        <div className='mainCart'>
            <h2>Your meeting room</h2>
            <div className='CartContents'>
                {cartItems.length === 0 ? (
                    <p>No order. <br /> To continue to the payment page you need to select a meeting  <Link to="/rooms"> rooms.</Link></p>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className='officeCard'>
                            <h3>{item.office.officeName}</h3>
                            <img src={item.office.picture} alt={item.office.officeName} />
                            <h4>Price: {item.office.rent_price}</h4>
                            <h4>Capacity: 1{item.office.capacity}</h4>
                            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                            <button onClick={() => navigateToCalendar(item.office)}>Choose day and time</button>
                        </div>
                    )))}
            </div>
        </div>
    );
};
export default Cart;