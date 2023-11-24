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

    const query = `INSERT INTO Full_Contract (Customer_Name, Year_Of_Birth, SSN, Customer_Address, Mobile, Property_ID, Date_Of_Contract, Price, Deposit, Remain, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      Customer_Name,
      Year_Of_Birth,
      SSN,
      Customer_Address,
      Mobile,
      Property_ID,
      Date_Of_Contract ? moment(Date_Of_Contract, "DD-MM-YYYY").format("YYYY-MM-DD") : null,
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
      return res.status(200).json(result);
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
