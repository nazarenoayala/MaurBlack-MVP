const flashesDAL = require('../dal/flashes.dal');

const getAllFlashes = async (req, res) => {
    try {
        //traer flahes disponibles
        const flashes = await flashesDAL.getAvailableFlashes();
        res.status(200).json(flashes);
    } catch (error) {
        console.error("Error al obtener flahes:", error);
        res.status(500).json({message: "Error al obtener los diseños"});
    }
};

module.exports = {getAllFlashes};