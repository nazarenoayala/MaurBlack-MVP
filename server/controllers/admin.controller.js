const adminDal = require('../dal/admin.dal');

//Appointments

const getAllAppointments = async (req, res) => {
    try {
        const { status } = req.query; //filtro: ?status=1
        const appointments = status
        ? await adminDal.getAllAppointmentsStatus(status)
        : await adminDal.getAllAppointments();
    res.status(200).json(appointments);    
    } catch (error) {
        console.error('Error getting appointments:', error);
        res.status(500).json({message: 'Error getting appointments'});
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body; //1: Pendiente, 2: Confirmada, 3: Realizada

        if(![1, 2, 3].includes(Number(status))) {
            return res.status(400).json({message: 'Invalid status value'});
        }

        await adminDal.updateAppointmentStatus(id, status);
        res.status(200).json({success: true, message: 'Status updated'});
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({message: 'Error updating status'});
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const {id} = req.params;
        await adminDal.deleteAppointment(id);
        res.status(200).json({success: true, message: 'Appointment deleted'});
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({message: 'Error deleting appointment'});
    }
};

//Flashes

const getAllFlashesAdmin = async (req, res) => {
    try {
        const flashes = await adminDal.getAllFlashesAdmin();
        res.status(200).json(flashes);
    } catch (error) {
        console.error('Error getting flashes', error);
        res.status(500).json({message: 'Error getting flashes'});
    }
};

const createFlash = async (req, res) => {
    try {
        const {flash_title, price, is_available, category_id} = req.body;
        const file = req.file;

        if(!flash_title || !price || !category_id || !file) {
            return res.status(400).json({message: 'Missing required fields'});
        }

        const flashData = {
            flash_title,
            flash_img_url: file.path,
            price,
            is_available,
            category_id
        };

        await adminDal.createFlash(flashData);
        res.status(201).json({success: true, message: 'Flash created'});
    } catch (error) {
        console.error('Error creating flash:', error);
        res.status(500).json({message: 'Error creating flash'});
    }
};

const flashAvailability = async (req, res) => {
    try {
        const {id} = req.params;
        const {is_available} = req.body;
        await adminDal.flashAvailability(id, is_available);
        res.status(200).json({success: true, message: 'Availability updated'});
    } catch (error) {
        console.error('Error toggling flash:', error);
        res.status(500).json({message: 'Error updating flash'});
    }
};

const deleteFlash = async (req, res) => {
    try {
        const {id} = req.params;
        await adminDal.deleteFlash(id);
        res.status(200).json({success: true, message: 'Flash deleted'});
    } catch (error) {
        console.error('Error deleting flash:', error);
        res.status(500).json({message: 'Error deleting flash'});
    }
};

//Works

const createWork = async (req, res) => {
    try {
        const {category_id, work_title, description, alt_text} = req.body;
        const file = req.file;

        if(!category_id || !work_title || !description || !file) {
            return res.status(400).json({message: 'Missing required fields'});
        }

        const workData = {
            category_id,
            work_title,
            description,
            work_img_url: file.path,
            alt_text
        };

        await adminDal.createWork(workData);
        res.status(201).json({success: true, message: 'Work created'});
    } catch (error) {
        console.error('Error creating work:', error);
        res.status(500).json({message: 'Error creating work'});
    }
};

const deleteWork = async (req, res) =>{
    try {
        const {id} = req.params;
        await adminDal.deleteWork(id);
        res.status(200).json({success: true, message: 'Work deleted'});
    } catch (error) {
        console.error('Error deleting work', error);
        res.status(500).json({message: 'Error deleting work'});
    }
};

module.exports = {
    getAllAppointments,
    updateAppointmentStatus,
    deleteAppointment,
    getAllFlashesAdmin,
    createFlash,
    flashAvailability,
    deleteFlash,
    createWork,
    deleteWork
};