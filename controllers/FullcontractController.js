const database = require("../models/connectDatabase");

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
      Status,
    } = req.body;

    //check missing field
    if (!Customer_Name || !Year_Of_Birth || !SSN || !Property_ID || !Status) {
      return res.status(400).json({ error: "Missing field" });
    }

    // Check if a contract with the given Property_ID exists
    const queryCheck = `SELECT * FROM Full_Contract WHERE Property_ID = ?`;

    try {
      const result = await new Promise((resolve, reject) => {
        database.query(queryCheck, [Property_ID], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  
      if (Array.isArray(result) && result.length > 0) {
        return res.status(400).json({ error: "A contract for this property already exists" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  

    const query = `INSERT INTO Full_Contract (Customer_Name, Year_Of_Birth, SSN, Customer_Address, Mobile, Property_ID, Date_Of_Contract, Price, Deposit, Remain, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      Customer_Name,
      Year_Of_Birth,
      SSN,
      Customer_Address,
      Mobile,
      Property_ID,
      Date_Of_Contract, // No need to format the date
      Price,
      Deposit,
      Remain,
      Status
    ];

    try {
      await database.query(query, values);
      return res.status(201).json({ message: "Full contract added successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getFullcontract(req, res) {
      const query = `SELECT * FROM Full_Contract`;
      database.query(query, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const formattedResult = result.map(contract => {
          // Convert Date_Of_Contract to a Date object
          const date = new Date(contract.Date_Of_Contract);

          // Format the date as YYYY-MM-DD
          const formattedDate = date.toISOString().split('T')[0];

          // Replace the original Date_Of_Contract with the formatted date
          return { ...contract, Date_Of_Contract: formattedDate };
        });

        return res.status(200).json(formattedResult);
      });
    }

  async getFullContractById(req, res) {
    const { id } = req.params;
    const query = `SELECT * FROM Full_Contract WHERE Full_Contract_Code = '${id}'`;
    database.query(query, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Contract not found" });
      }
      return res.status(200).json(result[0]);
    });
  }
}

module.exports = new FullcontractController();
