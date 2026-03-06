const eventsDAL = require('../dal/events.dal');

const getEvents = async (req, res) => {
    try {
        const events = await eventsDAL.getUpcomingEvents();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Error fetching events' });
    }
};

module.exports = { getEvents };