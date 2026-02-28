const appointmentsDAL = require('../dal/appointment.dal');
const mailer = require('../config/mailer');

//Reserva CUSTOM (con imagen adjunta)
const createCustomBooking = async (req, res) =>{
    try {
        //datos de texto (vienen de los appends del front)
        const { name, email, phone, bodyPart, size, description } = req.body;
        //archivo imagen
        const file = req.file

        if(!name || !email) {
            return res.status(400).json({message: 'Name and Email mandatory'});
        }

        //Guardo en DB
        const dbData = {
            appointment_type: 2, // 2 para Custom
            client_name: name,
            client_email: email,
            client_phone: phone ? phone.trim() : '', //si phone no existe, guardo string vacio o null
            flash_id: null,
            custom_description: `Part: ${bodyPart}, Size: ${size}, Idea: ${description}`,
            reference_img_url: file ? file.path : null
        }

        //configuracion correo para Maur
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `🔥 NEW CUSTOM TATTO REQUEST: ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; border: 1px solid #d4af37; padding: 20px;">
                    <h2 style="color: #000;">New tattoo request</h2>
                    <p><strong>Client:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Body part:</strong> ${bodyPart}</p>
                    <p><strong>Size:</strong> ${size}</p>
                    <p><strong>Idea:</strong> ${description}</p>
                </div>
            `,
            // Adjunto imagen para que la vea en el email
            attachments: file ? [{
                filename: file.originalname,
                path: file.path
            }] : []
        };

        //Respuesta automatica para el cliente
        const clientMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Confirmación de solicitud - Maur Black Tattoo`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; background-color: #000; color: #fff; padding: 20px; border: 1px solid #f0a500;">
                    <h2 style="color: #f0a500;">¡Hello, ${name}!</h2>
                    <p>I received your request for a custom tattoo.</p>
                    <p>I'll be reviewing your proposal and the reference image as soon as possible to give you a quote and check availability.</p>
                    <p style="color: #f0a500; font-weight: bold;">Thank you for trusting in my art!</p>
                    <hr style="border: 0.5px solid #333;">
                    <p style="font-size: 12px; color: #888;">This is an automated message, there is no need to reply.</p>
                </div>
            `
        };

        await Promise.all([ //envio los dos correos en simultaneo con promise all
            mailer.sendMail(adminMailOptions),
            mailer.sendMail(clientMailOptions)
        ])
        res.status(200).json({success: true, message: 'Custom booking sent!'})

    } catch (error) {
        console.error("Error", error);
        res.status(500).json({message:"Error processing custom request"})
        
    }
};

const createFlashBooking = async (req, res) =>{
    try {
        const {name, email, bodyPart, description, flash_title, price} = req.body;

        if(!name || !email) {
            return res.status(400).json({message: 'Name and Email mandatory'})
        }

        //Guardo en DB
        const dbData = {
            appointment_type: 1, // 1 para Flash
            client_name: name,
            client_email: email,
            client_phone: phone || '',
            flash_id: flash_id,
            custom_description: `Part: ${bodyPart}, Info: ${description}`,
            reference_img_url: null
        };

        await appointmentsDAL.createAppointment(dbData);

        //Email para Maur
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `⚡ NEW FLASH BOOKING: ${flash_title}`,
            html: `
                <div style="font-family: Arial, sans-serif; border: 1px solid #000; padding: 20px;">
                    <h2 style="color: #000; border-bottom: 2px solid #000;">Flash Booking Request</h2>
                    <p><strong>Flash Design:</strong> ${flash_title}</p>
                    <p><strong>Price:</strong> $${price}</p>
                    <hr>
                    <p><strong>Client:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Body part:</strong> ${bodyPart}</p>
                    <p><strong>Additional info:</strong> ${description}</p>
                </div>
            `
        };
        //Respuesta automatica para cliente
        const clientMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Flash Reserved! - Maur Black Tattoo`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; background-color: #111; color: #fff; padding: 20px; border-left: 5px solid #fff;">
                    <h2 style="color: #fff;">Hi ${name}!</h2>
                    <p>You have successfully requested the flash design: <strong>${flash_title}</strong>.</p>
                    <p>I will contact you shortly to schedule your appointment.</p>
                    <p style="font-weight: bold;">Maur Black</p>
                </div>
            `
        };

        await Promise.all([
            mailer.sendMail(adminMailOptions),
            mailer.sendMail(clientMailOptions)
        ]);
        res.status(200).json({success: true, message: "Flash booking sent!"});
    } catch (error) {
        console.error("Error flash booking", error);
        res.status(500).json({message: "Error proccessing flash request"})
        
    }
}

module.exports = { createCustomBooking, createFlashBooking };