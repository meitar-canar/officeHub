import React from 'react';
import './navBar.css';
import { Link } from 'react-router-dom';
import { INavBar } from './navDetails';
import { useShoppingCart } from '../OrderRoom/ShoppingCartContext';

// Assuming "Home" is the display string for the home icon
interface NavBarProps {
    items?: INavBar[];
    titleOfNav: string;
}

const NavBar: React.FC<NavBarProps> = (props) => {
    const { cartCount } = useShoppingCart(); // Use cartCount

    return (
        <div className='Navbar'>
            <div className='navBTN'>
                {props.items &&
                    props.items.map((curr) => (
                        <div className='navItem' key={curr.urlSTR}>
                            {curr.displayStr === 'Home' ? (
                                <Link to='/home' className='home-icon'>
                                    <img src='/img/office hub (1).png' alt='Home' />
                                </Link>
                            ) : (
                                <Link to={curr.urlSTR}>{curr.displayStr}</Link>
                            )}
                        </div>
                    ))}
                <h1>{props.titleOfNav}</h1>
                <Link to='/cart' className='cart-icon'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoPC55O_ZCCZhj58qwrGZ9B0VRWdEvT8uhqw&s' alt='Shopping Cart' />
                    {cartCount > 0 && <span className='cart-count'>{cartCount}</span>}
                </Link>
            </div>
        </div>
    );
};

export default NavBar;
