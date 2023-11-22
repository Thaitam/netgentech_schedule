const sql = require('msnodesqlv8');
require('dotenv').config();

const connectionString = `server=${process.env.DB_SERVER};Database=QUANLYBDS_TEAM3;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}`;

const conn = sql.open(connectionString, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connection successful!');
    }
});
module.exports = conn; 