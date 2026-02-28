const validateBooking = (req, res, next) => {
    const { name, email, appointment_type, description } = req.body;
    const errors = [];

    //Validar nombre
    if (!name || name.trim().length < 2) {
        errors.push("Name is required and must be at least 2 characters.");
    }

    // Validar email 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push("A valid email is required.");
    }

    //Validar cita (1: Flash, 2: Custom)
    if (!appointment_type || ![1, 2].includes(Number(appointment_type))) {
        errors.push("Invalid appointment type.");
    }

    //Validar descripcion
    if (!description || description.trim().length < 10) {
        errors.push("Please provide a bit more detail (at least 10 characters).");
    }

    // Respuesta a los errores
    if (errors.length > 0) {
        return res.status(400).json({ 
            success: false, 
            message: "Validation failed", 
            errors: errors 
        });
    }

    // Si todo ok pasamos al controlador
    next();
};

module.exports = { validateBooking };