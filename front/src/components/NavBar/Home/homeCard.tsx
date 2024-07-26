import React from 'react';
import './homeCard.css'; // Import styles for the homeCard component
import { office } from '../types/types';


export default function HomeCard(props: { theRoomsOfCard: office; }) {




    return (
        <div className='RoomsCard'>
            <div>
                <img src={props.theRoomsOfCard.picture} alt={props.theRoomsOfCard.officeName} />
                <h3>Office Name: {props.theRoomsOfCard.officeName}</h3>
                <h3>Price: {props.theRoomsOfCard.rent_price}</h3>
                <h3>Location: {props.theRoomsOfCard.location}</h3>
                <h3>Capacity: 1{props.theRoomsOfCard.capacity}</h3>
            </div>

        </div>
    );
}


// import React, { useState } from 'react';
// import './homeCard.css'
// import { offices } from '../types/types';
// import { To, useNavigate } from 'react-router-dom';

// export default function homeCard(props: { theHomeOfCard: offices; }) {


//     return (
//         <div className='HomeCard' >
//             <div>
//                 <img src={props.theHomeOfCard.picture} alt={props.theHomeOfCard.officeName} />
//                 <h3>Office Name: {props.theHomeOfCard.officeName}</h3>
//                 <h3>Price: {props.theHomeOfCard.rent_price}</h3>
//                 <h3>Location: {props.theHomeOfCard.location}</h3>
//                 <h3>Capacity: 1{props.theHomeOfCard.capacity}</h3>
//             </div>

//         </div>
//     );
// }