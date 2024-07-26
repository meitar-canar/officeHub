import React, { useState } from 'react';
import { usersProfile } from '../types/types';
import './profileCard.css';
import { To, useNavigate } from 'react-router-dom';
import { error } from 'console';

export default function ProfileCard(props: { theProfOfCard: usersProfile; changeColor: string }) {
    const [theinfoCard, settheinfoCard] = useState<boolean>(false);
    const [requestMessage, setRequestMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(props.theProfOfCard.phone);

    const navigate = useNavigate();

    const handleFormSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/sendRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: requestMessage,
                    phone: phoneNumber,
                    userId: props.theProfOfCard.userId,
                }),
            });
            if (response.ok) {
                alert('Request sent successfully');
                navigate('/home');
            } else {
                alert('Failed to send request');
            }
        } catch (error) {
            console.error('Error sending request:', error);
            alert('Error sending request');
        }
    };

    return (
        <div className="mainProfile" style={{ backgroundColor: props.changeColor }} onMouseEnter={() => settheinfoCard(true)} onMouseLeave={() => settheinfoCard(false)}>
            <div className="profile-page">
                <h2>User Profile</h2>
                <h3>Welcome: {props.theProfOfCard.firstName} {props.theProfOfCard.lastName}</h3>
                <h3>From: {props.theProfOfCard.address}</h3>
                <h3>Phone: {props.theProfOfCard.phone}</h3>

                <p>
                    Thank you for your interest in registering on our website.
                    To ensure we can connect you with the most appropriate representative, please state the subject of your request and your phone number or continue to the home page
                </p>
                <input type="text" placeholder="For example: redo my last order" value={requestMessage} onChange={(e) => setRequestMessage(e.target.value)} />
                <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <button onClick={handleFormSubmit}>Submit</button>
                <button onClick={() => navigate('/home')}>To Home</button>
            </div>
        </div>
    );
}

