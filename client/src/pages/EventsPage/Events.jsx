import React from 'react'
import './events.css'

const Events = () => {
    const conventions = [
    {
      id: 1,
      date: "APR 3-4-5",
      year: "2026",
      title: "ORDER TATTOO JAM",
      city: "Amsterdam, NL"
    },
    {
      id: 2,
      date: "MAY 8-9",
      year: "2026",
      title: "TRUE BLUE TATTOO CONVENTION",
      city: "EINDHOVEN, NL"
    },
    {
      id: 3,
      date: "JUN 5-6-7",
      year: "2026",
      title: "TRULY YOURS TATTOO FEST",
      city: "WIESBADEN, GER"
    },
  ];
  return (
   <main className='events-page'> 
    <div className='events-header'>
        <h1 className='events-title'>CONVENTIONS</h1>
        <span className='events-subt'>CATCH ME AT</span>
    </div>
    <div className='events-list'>
        {conventions.map(event =>(
            <div key={event.id} className='event-card'>
                <div className='event-date-box'>
                    <span className='event-date'>{event.date}</span>
                    <span className='event-date'>{event.year}</span>
                </div>
            <div className='event-info'>
                <h2 className='event-name'>{event.title}</h2>
                <p className='event-location'>{event.city}</p>
            </div>
            </div>
        ))}
    </div>
    </main>
  )
}

export default Events;