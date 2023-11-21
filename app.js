// app.js
const express = require('express');
const app = express();
const port = 8888;
const path = require('path');
const FullcontractRo = require('./routes/FullcontractRo');
const PropertyRo = require('./routes/PropertyRo');
app.use(express.json());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.send('server is running');
});
//render
app.get('/home', (req, res) => {
  res.render('home');
});

//routes
app.use('/api/fullcontract', FullcontractRo);
app.use('/api/property', PropertyRo);


app.listen(port, () => console.log(`App đang lắng nghe trên cổng ${port}`));