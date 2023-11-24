const database = require('../models/connectDatabase');

class PropertyController {
    getAllProperty(req, res) {
        const query = `SELECT * FROM Property`;
        database.query(query, (err, result) => {
            if(err){
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            return res.status(200).json(result);
        })
    }

    getPropertyById(req, res) {
        const { id } = req.params;
        const query = `SELECT * FROM Property WHERE ID = '${id}'`;
        database.query(query, (err, result) => {
            if(err){
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if(result.length === 0){
                return res.status(404).json({ error: 'Property not found' });
            }
            return res.status(200).json(result[0]);
        })
    }
}

module.exports = new PropertyController();