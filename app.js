// app.js
const express = require('express');
const app = express();
const port = 3000;
const connection = require('./models/connectDatabase');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  connection.query('SELECT * FROM your_table', (err, results) => {
    if (err) console.error('Error querying MySQL:', err);
    res.render('index', { data: results });
  });
});

app.listen(port, () => console.log(`App đang lắng nghe trên cổng ${port}`));