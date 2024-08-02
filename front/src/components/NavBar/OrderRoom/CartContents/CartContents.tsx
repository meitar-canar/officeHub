import { useShoppingCart } from '../ShoppingCartContext';
import './CartContents.css';
import { Link, useNavigate } from 'react-router-dom';
import { office } from '../../types/types';

const Cart = () => {
    const { cartItems, removeFromCart } = useShoppingCart();
    const navigate = useNavigate();

    // TODO addd the time and day to the 
    const navigateToCalendar = (office: office) => {
        navigate('/calendar', { state: { office } });
    };

    return (
        <div className='mainCart'>
            <h2>Your meeting room</h2>
            <div className='CartContents'>
                {cartItems.length === 0 ? (
                    <p>No order. <br /> To continue to the payment page you need to select a meeting <Link to="/rooms">rooms.</Link></p>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className='officeCard'>
                            <h3>{item.office.officeName}</h3>
                            <img src={item.office.picture} alt={item.office.officeName} />
                            <h4>Price: {item.office.rent_price}</h4>
                            <h4>Capacity: 1{item.office.capacity}</h4>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            <button onClick={() => navigateToCalendar(item.office)}>Back To The Calendar</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Cart;
