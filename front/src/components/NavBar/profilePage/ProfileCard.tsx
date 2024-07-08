import React, { useState } from 'react';
import { usersProfile } from '../types/types';
import './profileCard.css';
import { To, useNavigate } from 'react-router-dom';

export default function ProfileCard(props: { theProfOfCard: usersProfile; changeColor: string }) {
    const [theinfoCard, settheinfoCard] = useState<boolean>(false);

    const navigate = useNavigate();
    const navigateToNewPage = (pagePath: To) => {
        navigate(pagePath);
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
                    <br />
                    <br />
                    To ensure we can connect you with the most appropriate representative,
                    Please indicate the subject of your request and your phone number
                </p>
                <input type="text" placeholder="Please indicate the subject of the request" />
                <input type="text" placeholder={props.theProfOfCard.phone} />
                <button onClick={() => navigateToNewPage('/home')}>Submit</button>
                <button onClick={() => navigateToNewPage('/rooms')}>Back to our offices</button>
            </div>
        </div>
    );
}
