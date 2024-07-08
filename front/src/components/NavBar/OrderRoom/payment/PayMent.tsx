import { To, useNavigate, useLocation } from 'react-router-dom';
import './PayMent.css';
import React from 'react';

export default function PayMent() {
    const navigate = useNavigate();
    const location = useLocation();
    const { events } = location.state || {};

    const navigateBackToHome = (PagePath: To) => {
        navigate(PagePath);
    };

    return (
        <div className='PayMent'>
            <form>
                <div className='quiz'>
                    <div>
                        <h4>First Name</h4>
                        <input type="text" name='First Name' id='id' placeholder='First Name:' />
                    </div>
                    <div>
                        <h4>Last Name</h4>
                        <input type="text" name='Last Name' id='id' placeholder='Last Name:' />
                    </div>
                    <div>
                        <h4>Card Number</h4>
                        <input type="password" name="password" id="id" pattern='[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}*' inputMode='numeric' maxLength={16} spellCheck minLength={16} placeholder='Card Number:' />
                    </div>
                    <div>
                        <h4>Validity</h4>
                        <input type="month" name="month" id="id" />
                    </div>
                    <div>
                        <h4>CVV</h4>
                        <input type="password" name="cvv" id="id" maxLength={3} placeholder='CVV:' />
                    </div>
                    <div>
                        <button type="submit" value="Submit" formTarget='blank' onClick={() => navigateBackToHome('/home')}>Order Now</button>
                    </div>
                </div>
            </form>
            <div className='img'>
                <img src="https://t4.ftcdn.net/jpg/06/16/99/51/360_F_616995128_xWAth0i92Adkm4A9b6RGXCnO5yocUmnU.jpg" alt="office" />
            </div>
            {events && (
                <div className='event-details'>
                    <h2>Booking Details</h2>
                    {events.map((event: any, index: number) => (
                        <div key={index}>
                            <p><strong>Name:</strong> {event.title}</p>
                            <p><strong>Receiving the office at:</strong> {new Date(event.start).toLocaleString()}</p>
                            <p><strong>Returning the office at:</strong> {new Date(event.end).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
