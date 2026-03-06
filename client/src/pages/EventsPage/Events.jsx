import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import './events.css';

const API_URL = import.meta.env.VITE_API_URL;

//Formato de fecha de Google Calendar ISO string para re utlizar formato
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    }).toUpperCase();
};

const formatYear = (dateStr) => {
    return new Date(dateStr).getFullYear();
};

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/events`);
                setEvents(res.data);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError('Could not load events.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) return <Loader message="LOADING EVENTS" />;

    return (
        <main className='events-page'>
            <div className='events-header'>
                <h1 className='events-title'>CONVENTIONS</h1>
                <span className='events-subt'>CATCH ME AT</span>
            </div>

            <div className='events-list'>
                {error ? (
                    <p style={{ color: '#888', textAlign: 'center' }}>{error}</p>
                ) : events.length === 0 ? (
                    <p style={{ color: '#888', textAlign: 'center', letterSpacing: '2px' }}>
                        NO UPCOMING EVENTS
                    </p>
                ) : (
                    events.map(event => (
                        <div key={event.id} className='event-card'>
                            <div className='event-date-box'>
                                <span className='event-date'>{formatDate(event.start)}</span>
                                <span className='event-year'>{formatYear(event.start)}</span>
                            </div>
                            <div className='event-info'>
                                <h2 className='event-name'>{event.title}</h2>
                                {event.location && (
                                    <p className='event-location'>{event.location}</p>
                                )}
                                {event.description && (
                                    <p className='event-description'>{event.description}</p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
};

export default Events;