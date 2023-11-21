const database = require('../models/connectDatabase');

class FullcontractController {
  async addFullcontract(req, res) {
    const {
      Customer_Name,
      Year_Of_Birth,
      SSN,
      Customer_Address,
      Mobile,
      Property_ID,
      Date_Of_Contract,
      Price,
      Deposit,
      Remain,
      Status
    } = req.body;
    //check missing field
    if (!Customer_Name || !Year_Of_Birth || !SSN || !Property_ID || !Status) {
        return res.status(400).json({ error: 'Missing field' });
    }


    const query = `INSERT INTO Full_Contract (Customer_Name, Year_Of_Birth, SSN, Customer_Address, Mobile, Property_ID, Date_Of_Contract, Price, Deposit, Remain, Status) VALUES ('${Customer_Name}', ${Year_Of_Birth}, ${SSN}, ${Customer_Address}, ${Mobile}, ${Property_ID}, ${Date_Of_Contract ? `'${moment(Date_Of_Contract, 'MM-DD-YYYY').format('YYYY-MM-DD')}'` : 'NULL'}, ${Price}, ${Deposit}, ${Remain}, ${Status})`;

    try {
      await database.query(query);
      return res.status(201).json({ message: 'Full contract added successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

async getFullcontract(req, res) {
    const query = `SELECT * FROM Full_Contract`;
    database.query(query, (err, result) => {
        if(err){
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(result);
    })
}}


module.exports = new FullcontractController();