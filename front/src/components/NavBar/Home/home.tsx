import React, { useEffect, useState } from 'react';
import './home.css'; // Import styles for the home component
import HomeCard from './homeCard'; // Import the homeCard component
import { To, useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const navigateToNewPage = (pagePath: To) => {
        navigate(pagePath);
    };

    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='HomeContainer'>
            <div className='imgDiv'>
                <div className={`welcomeWords ${scrollY > 50 ? 'shrink' : ''}`}>
                    <h1>Welcome To Office Hub</h1>
                    <h3>We have many offices for you</h3>
                    <button onClick={() => navigateToNewPage('/rooms')}>Start Here</button>
                </div>
                <img src="https://cdn.prod.website-files.com/6442419dcf656a81da76b503/65abe47618f010d59935538b_office-background-for-zoom.webp" alt="officeImg" />
            </div>
            <div className='DivIcons'>
                <div><img src="https://cdn-icons-png.freepik.com/512/4594/4594998.png" alt="workspace img" />
                    <h5>Your perfect workspace</h5>
                    <p>Find productive workspace for your needs, whether it's a single desk, a meeting room, or a private office.</p>
                </div><hr />
                <div><img src="https://cdn-icons-png.freepik.com/512/5899/5899157.png" alt="calander img" />
                    <h5>Work with flexible terms</h5>
                    <p>Enjoy the freedom of having space whenever you need it—by the hour, the day, the month, or longer.</p>
                </div><hr />
                <div><img src="https://icons.iconarchive.com/icons/steve/zondicons/512/Location-icon.png" alt="" />
                    <h5>Wherever work takes you</h5>
                    <p>Unlock a world of workspace within our global footprint — work from near home, at multiple locations.</p>
                </div>
            </div>
            <div className='signUpDiv'>
                <div className='SignUpWords'>
                    <h1>Sign up for a week trial on Private Offices at Office Hub</h1>
                    <h3>Private Offices for teams of all sizes, for a free one-week trial.</h3>
                    <button onClick={() => navigateToNewPage('/signUp')}>To SignUp</button>
                    <h6>Limited time offer, applicable to Private Offices only, subject to availability, for new members only. WeWork may change or cancel the offer at any time. Subject to the terms & conditions and membership agreement.</h6>
                </div>
                <img src="https://images.squarespace-cdn.com/content/v1/63d316419f963d5d69eb17a6/436c6f77-e69c-41d5-826b-07322665e546/DSC05022.jpg" alt="officeImg" />
            </div>
            <br />
            <div className='RoomsDiv'>
                <img src="https://venturex.co.uk/wp-content/uploads/2023/02/Meeting-Room-WC-4.jpg" alt="officeImg" />
                <div className='RoomsDivDetail'>
                    <h1>Come work together</h1>
                    <h3>Our locations throughout Israel are open and include quick access to safe spaces.</h3>
                    <button onClick={() => navigateToNewPage('/rooms')}>Rooms</button>
                    <h6>*Available at OfficeHub Israel only. Subject to availability. OfficeHub may change or cancel the offer at any time. Subject to the terms & conditions and membership agreement.</h6>
                </div>
            </div>
            <br />
            <div className='HybridDiv'>
                <div className='HybridWords'>
                    <h1>Introducing the Hybrid Office</h1>
                    <h3>An office for your team, only when you need it.
                        <br /><br />
                        A private workspace that will be available for you two or three times a week, equipped with all you need for a productive workday. The ideal solution for modern teams that combine remote work and the office</h3>
                    <button onClick={() => navigateToNewPage('/rooms')}>To Rooms</button>
                </div>
                <img src="https://media.istockphoto.com/id/1460755337/photo/white-color-theme-modern-style-office-with-exposed-concrete-floor-and-a-lot-of-plant-3d.jpg?s=612x612&w=0&k=20&c=PX1TFWVrLL34jgkmFREmxrzy3M4rqhBk4NMrHFOTmo8=" alt="officeImg" />
            </div>
            <br />
            <br />
        </div>
    )
}
