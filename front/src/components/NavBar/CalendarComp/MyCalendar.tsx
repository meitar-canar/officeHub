import React, { useState } from 'react';
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Event as BigCalendarEvent } from 'react-big-calendar';
import { offices } from '../types/types';
import { To, useLocation, useNavigate } from 'react-router-dom';
import './MyCalendar.css';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

export interface CustomEvent extends BigCalendarEvent {
    id: number;
    officeName?: string;
}
const initialEvents: CustomEvent[] = [
    // Example event
    {
        id: 0,
        title: 'All Day Event',
        allDay: true,
        start: new Date(),
        end: new Date(),
    },
    // Additional events here
];

const MyCalendar = () => {
    const [myEvents, setMyEvents] = useState<CustomEvent[]>(initialEvents);

    const location = useLocation();
    const navigate = useNavigate();
    const office: offices | undefined = location.state?.office;


    const handleSelectSlot = (slotInfo: SlotInfo) => {
        if (!office) return;

        const newEvent: CustomEvent = {
            id: myEvents.length,
            title: `Office: ${office.officeName}`,
            start: slotInfo.start,
            end: slotInfo.end,
            allDay: slotInfo.action === 'doubleClick',
            officeName: office.officeName,
        };
        setMyEvents([...myEvents, newEvent]);
        sendEventToBackend(newEvent);
    };

    const handleSelectEvent = (event: CustomEvent) => {
        if (window.confirm(`Are you sure you want to delete the event '${event.title}'?`)) {
            setMyEvents(myEvents.filter(e => e.id !== event.id));
            // Optionally call your backend API to delete the event
            deleteEventFromBackend(event);
        }
    };

    const sendEventToBackend = async (event: CustomEvent) => {
        try {
            const response = await fetch('http://your-backend-api-url/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            });

            if (response.ok) {
                console.log('Event saved successfully');
            } else {
                console.error('Failed to save event');
            }
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    const deleteEventFromBackend = async (event: CustomEvent) => {
        try {
            const response = await fetch(`http://your-backend-api-url/events/${event.id}`, {
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
        navigate('/PayMent', { state: { events: myEvents } });
    };

    return (
        <div className='calendar'>
            <button className='btn' onClick={navigateToPayment}>Proceed to Payment</button>

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
        </div>
    );
};

export default MyCalendar;
