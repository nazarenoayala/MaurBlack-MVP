import React from 'react'
import './events.css'

const Events = () => {
    const conventions = [
    {
      id: 1,
      date: "MAR 15-17",
      year: "2024",
      title: "BUENOS AIRES TATTOO CONVENTION",
    },
    {
      id: 2,
      date: "MAY 22-24",
      year: "2024",
      title: "BARCELONA TATTOO EXPO",
      city: "Fira Barcelona, ES",
    }
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