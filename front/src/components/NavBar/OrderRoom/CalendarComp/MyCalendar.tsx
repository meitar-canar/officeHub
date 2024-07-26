import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './MyCalendar.css';
import { office } from '../../types/types';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

export interface CustomEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
    userId: number;
    officesId: number;
}

const MyCalendar = () => {
    const [myEvents, setMyEvents] = useState<CustomEvent[]>([]);
    const [newlySelectedEvents, setNewlySelectedEvents] = useState<CustomEvent[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const userId = 1; // You might want to get this from context or props
    const [office, setOffice] = useState<office>();
    const theIdOfTheRoom = Number.parseInt(useParams().id || "");

    useEffect(() => {
        if (theIdOfTheRoom) {
            fetchEvents();
            fetchRoomInfo();
        }
    }, [theIdOfTheRoom]);

    const fetchRoomInfo = async () => {
        try {
            const url = `http://localhost:3001/office/${theIdOfTheRoom}`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setOffice(data.recordset[0]);
            } else {
                console.error('Failed to fetch officeName:', response.status);
            }
        } catch (error) {
            console.error('Error fetching officeName:', error);
        }
    };

    const fetchEvents = async () => {
        try {
            const url = `http://localhost:3001/calendar/${theIdOfTheRoom}`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                const eventsArray = data.x?.recordset || [];
                const parsedEvents = eventsArray.map((event: any) => ({
                    ...event,
                    start: new Date(event.startDate),
                    end: new Date(event.endDate),
                }));
                setMyEvents(parsedEvents);
            } else {
                console.error('Failed to fetch events:', response.status);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleSelectSlot = async (slotInfo: SlotInfo) => {
        if (!office) {
            console.error('Office data is not available');
            return;
        }

        const newEvent: CustomEvent = {
            id: myEvents.length + 1,
            title: `Office: ${office.officeName}`,
            start: new Date(slotInfo.start),
            end: new Date(slotInfo.end),
            allDay: slotInfo.action === 'doubleClick',
            userId: userId,
            officesId: theIdOfTheRoom
        };

        if (isTimeSlotAvailable(newEvent.start, newEvent.end, newEvent.officesId)) {
            const updatedEvents = [...myEvents, newEvent];
            setMyEvents(updatedEvents);
            setNewlySelectedEvents([...newlySelectedEvents, newEvent]);
            await sendEventToBackend(newEvent);
        } else {
            alert('This time slot is already booked.');
        }
    };

    const handleSelectEvent = (event: CustomEvent) => {
        if (window.confirm(`Are you sure you want to delete the event '${event.title}'?`)) {
            const updatedEvents = myEvents.filter(e => e.id !== event.id);
            setMyEvents(updatedEvents);
            setNewlySelectedEvents(newlySelectedEvents.filter(e => e.id !== event.id));
            deleteEventFromBackend(event);
        }
    };

    const isTimeSlotAvailable = (start: Date, end: Date, officesId: number) => {
        return !myEvents.some(
            (event) =>
                event.officesId === officesId && (
                    (event.start && start >= event.start && start < event.end) ||
                    (event.end && end > event.start && end <= event.end) ||
                    (event.start && event.end && start <= event.start && end >= event.end))
        );
    };

    const sendEventToBackend = async (event: CustomEvent) => {
        const eventToSend = {
            ...event,
            startDate: event.start.toISOString(),
            endDate: event.end.toISOString(),
        };

        try {
            const response = await fetch('http://localhost:3001/calendar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventToSend),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Event saved successfully:', data);
            } else {
                const errorText = await response.text();
                console.error('Failed to save event:', errorText);
            }
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    const deleteEventFromBackend = async (event: CustomEvent) => {
        try {
            const response = await fetch(`http://localhost:3001/calendar/${event.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Event deleted successfully');
            } else {
                console.error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const navigateToPayment = () => {
        if (newlySelectedEvents.length > 0 && office) {
            navigate('/PayMent', { state: { events: newlySelectedEvents, office: office } });
        } else {
            alert('Please select a date and time for your booking.');
        }
    };

    return (
        <div className='calendar'>
            <h2>Your meeting room</h2>
            <h2>{office?.officeName}</h2>
            <Calendar
                localizer={localizer}
                events={myEvents}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                defaultView="month"
                views={['month', 'week', 'day']}
                step={60}
                showMultiDayTimes
                style={{ height: 500 }}
            />
            <button className='btn' onClick={navigateToPayment}>Proceed to Payment</button>
        </div>
    );
};

export default MyCalendar;


// ===========================================================================
// import React, { useState, useEffect } from 'react';
// import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import './MyCalendar.css';
// import { useShoppingCart } from '../ShoppingCartContext';
// import { office } from '../../types/types';

// moment.locale('en-GB');
// const localizer = momentLocalizer(moment);

// export interface CustomEvent {
//     id: number;
//     title: string;
//     start: Date;
//     end: Date;
//     allDay: boolean;
//     userId: number;
//     officesId: number;
// }

// const MyCalendar = () => {
//     const [myEvents, setMyEvents] = useState<CustomEvent[]>([]);
//     const location = useLocation();
//     const navigate = useNavigate();
//     const userId = 1;
//     const [office, setOffice] = useState<office>();
//     const theIdOfTheRoom = Number.parseInt(useParams().id || "");

//     useEffect(() => {
//         if (theIdOfTheRoom) {
//             console.log('Inside useEffect going to fetch events');
//             fetchEvents();
//             fetchRoomInfo();
//         }
//     }, [theIdOfTheRoom]);

//     const fetchRoomInfo = async () => {
//         try {
//             const url = `http://localhost:3001/office/${theIdOfTheRoom}`;
//             const response = await fetch(url);
//             if (response.ok) {
//                 const data = await response.json();

//                 const eventsArray = data.recordset || [];

//                 setOffice(eventsArray[0].officeName)
//             } else {
//                 console.error('Failed to fetch officeName:', response.status);
//             }
//         } catch (error) {
//             console.error('Error fetching officeName:', error);
//         }
//     };

//     const fetchEvents = async () => {
//         console.log('Inside fetchEvents');
//         try {
//             const url = `http://localhost:3001/calendar/${theIdOfTheRoom}`;
//             const response = await fetch(url);
//             if (response.ok) {
//                 const data = await response.json();

//                 const eventsArray = data.x?.recordset || [];

//                 // Convert date strings to Date objects
//                 const parsedEvents = eventsArray.map((event: any) => ({
//                     ...event,
//                     start: new Date(event.startDate),
//                     end: new Date(event.endDate),
//                 }));
//                 setMyEvents(parsedEvents);
//             } else {
//                 console.error('Failed to fetch events:', response.status);
//             }
//         } catch (error) {
//             console.error('Error fetching events:', error);
//         }
//     };

//     const handleSelectSlot = (slotInfo: SlotInfo) => {
//         console.log('Location state:', location.state);
//         console.log('Office data:', theIdOfTheRoom);

//         if (!theIdOfTheRoom) {
//             console.error('Office data is not available');
//             return;
//         }

//         console.log('Slot selected:', slotInfo);

//         const newEvent: CustomEvent = {
//             id: myEvents.length + 1,
//             title: `Office: ${office ? office.officeName ? office?.officeName : "" : ""}`,
//             start: new Date(slotInfo.start),
//             end: new Date(slotInfo.end),
//             allDay: slotInfo.action === 'doubleClick',
//             userId: userId,
//             officesId: theIdOfTheRoom
//         };

//         if (isTimeSlotAvailable(newEvent.start, newEvent.end, newEvent.officesId)) {
//             const updatedEvents = [...myEvents, newEvent];
//             // TODO: add to cart (call add cart of context) the new chosen room (our useState 'office') of this added event
//             setMyEvents(updatedEvents);
//             sendEventToBackend(newEvent);
//         } else {
//             alert('This time slot is already booked.');
//         }
//     };

//     const handleSelectEvent = (event: CustomEvent) => {
//         if (window.confirm(`Are you sure you want to delete the event '${event.title}'?`)) {
//             const updatedEvents = myEvents.filter(e => e.id !== event.id);
//             setMyEvents(updatedEvents);
//             deleteEventFromBackend(event);
//         }
//     };

//     const isTimeSlotAvailable = (start: Date, end: Date, officesId: number) => {
//         return !myEvents.some(
//             (event) =>
//                 event.officesId === officesId && (
//                     (event.start && start >= event.start && start < event.end) ||
//                     (event.end && end > event.start && end <= event.end) ||
//                     (event.start && event.end && start <= event.start && end >= event.end))
//         );
//     };

//     const sendEventToBackend = async (event: CustomEvent) => {
//         const eventToSend = {
//             ...event,
//             startDate: event.start.toISOString(),
//             endDate: event.end.toISOString(),
//         };

//         console.log("Sending event to backend:", eventToSend);

//         try {
//             const response = await fetch('http://localhost:3001/calendar', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(eventToSend),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('Event saved successfully:', data);
//             } else {
//                 const errorText = await response.text();
//                 console.error('Failed to save event:', errorText);
//             }
//         } catch (error) {
//             console.error('Error saving event:', error);
//         }
//     };

//     const deleteEventFromBackend = async (event: CustomEvent) => {
//         try {
//             const response = await fetch(`http://localhost:3001/calendar/${event.id}`, {
//                 method: 'DELETE',
//             });

//             if (response.ok) {
//                 console.log('Event deleted successfully');
//             } else {
//                 console.error('Failed to delete event');
//             }
//         } catch (error) {
//             console.error('Error deleting event:', error);
//         }
//     };

//     const navigateToPayment = () => {
//         console.log('Office data:', theIdOfTheRoom);

//         if (!theIdOfTheRoom) {
//             console.error('Office data is not available');
//             return;
//         }

//         const currentOrderEvents = myEvents.filter(event => event.officesId === theIdOfTheRoom && event.userId === userId);
//         navigate('/PayMent', { state: { events: currentOrderEvents, office: theIdOfTheRoom } });
//     };

//     return (
//         <div className='calendar'>
//             <h2>Your meeting room {JSON.stringify(location)}</h2>
//             <h2>{theIdOfTheRoom}</h2>
//             <Calendar
//                 localizer={localizer}
//                 events={myEvents}
//                 selectable
//                 onSelectSlot={handleSelectSlot}
//                 onSelectEvent={handleSelectEvent}
//                 defaultView="month"
//                 views={['month', 'week', 'day']}
//                 step={60}
//                 showMultiDayTimes
//                 style={{ height: 500 }}
//             />
//             <button className='btn' onClick={navigateToPayment}>Proceed to Payment</button>
//         </div>
//     );
// };

// export default MyCalendar;
