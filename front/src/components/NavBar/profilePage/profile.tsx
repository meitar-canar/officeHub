import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { usersProfile } from '../types/types';
import './profile.css';
import ProfileCard from './ProfileCard';

interface JwtPayload {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    userId: string;
    userName: string;
    // Add other properties if needed
}

export default function ProfilePage() {
    const [userProfile, setUserProfile] = useState<usersProfile | null>(null);
    const [theColor, settheColor] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const tokenParts = token.split('.');
                    if (tokenParts.length !== 3) {
                        throw new Error('Invalid token structure');
                    }
                    console.log('Header:', atob(tokenParts[0]));
                    console.log('Payload:', atob(tokenParts[1]));
                    console.log('Signature:', tokenParts[2]);

                    const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token); 

                    setUserProfile({
                        firstName: decodedToken.firstName,
                        lastName: decodedToken.lastName,
                        address: decodedToken.address,
                        phone: decodedToken.phone,
                        userId: decodedToken.userId,
                        userName: decodedToken.userName,
                    });
                } catch (error) {
                    console.error('Error decoding token or fetching profile:', error);
                }
            } else {
                console.error('No token found in localStorage');
            }
        };
        fetchProfile();
    }, []); 

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    const handleColorChange = (newColor: string) => {
        settheColor(newColor);
    };

    return (
        <div className='ProfileMainComp'>
            <select id="ProfileSelect" onChange={(e) => { settheColor(e.target.value) }}>
                <option value="">Light mode</option>
                <option value="rgb(146, 146, 146)">Dark mode</option>
            </select>
            <div className='ProfileComp'>
                <ProfileCard theProfOfCard={userProfile} changeColor={theColor} />
            </div>
        </div>
    );
}
