const worksDAL = require('../dal/works.dal');

const getWorks = async (req, res) => {
    try {
        const works = await worksDAL.getAllWorks();
        res.json(works);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los trabajos hechos'});
    }
};

const getWorksByType = async (req, res) =>{
    try {
        const {type} = req.params;
        const works = await worksDAL.getWorksByType(type);

        if (works.length === 0) {
            return res.status(404).json({message: "Trabajos no encontrados"})
        }

        res.json(works);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener trabajos por tipo'})
    }
}

const createWork = async (req, res) => {
    try {
        //logica para instertar en la DB
        res.json({message: "Trabajo creado con exito"})
    } catch (error) {
        res.status(500).json({error: 'Error al crear trabajo'});
    }
};

module.exports = { getWorks, createWork, getWorksByType };