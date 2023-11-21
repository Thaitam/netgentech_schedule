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
}

module.exports = new PropertyController();