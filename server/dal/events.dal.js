const calendar = require('../config/googleCalendar');

const getUpcomingEvents = async () => {
    const res = await calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        timeMin: new Date().toISOString(), // only upcoming
        maxResults: 20,
        singleEvents: true,
        orderBy: 'startTime',
    });

    // Temporary debug
    console.log('CALENDAR ID:', process.env.GOOGLE_CALENDAR_ID);
    console.log('EVENTS FOUND:', res.data.items.length);
    console.log('RAW EVENTS:', JSON.stringify(res.data.items, null, 2));

    return res.data.items.map(event => ({
        id: event.id,
        title: event.summary,
        description: event.description || null,
        location: event.location || null,
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
        allDay: !event.start.dateTime
    }));
};

module.exports = { getUpcomingEvents };