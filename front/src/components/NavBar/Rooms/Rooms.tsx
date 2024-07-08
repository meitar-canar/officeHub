import { useEffect, useState } from 'react'
import './Rooms.css'
import RoomsCard from './RoomsCard';

export default function Rooms() {
    const [theArrRooms, setTheArrRooms] = useState([]);
    const [theColor, settheColor] = useState('');

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
        <div className='RoomsComp'>
            <h1>Our Rooms</h1>
            <select id="RoomSelect" onChange={(e) => { settheColor(e.target.value) }}>
                <option value="">Light mode</option>
                <option value="rgb(146, 146, 146)">Dark mode</option>
            </select>
            <div className='theComp'>
                {theArrRooms.length === 0 ? (
                    <p>Loading rooms...</p>
                ) : (
                    theArrRooms.map((curr) => (
                        <RoomsCard theRoomsOfCard={curr} key={curr} changeColor={theColor} />
                    ))
                )}
            </div>
        </div>
    )
}
