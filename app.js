// app.js
const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const app = express();
const port = 8888;
const path = require('path');
const FullcontractRo = require('./routes/FullcontractRo');
const PropertyRo = require('./routes/PropertyRo');
app.use(express.json());

app.use(express.static('public'))
// app.use('/img', express.static(__dirname + 'public/img'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use(expressLayouts)
app.set('layout', './layout/managementLayout')

//render
app.get('/', (req, res) => {
  res.render('index' , { title : 'Homepage'});
});

app.get('/full-contract', (req, res) => {
  res.render('./components/fullContract/index.ejs' , { title : 'Full Contract'});
});
app.get('/installment-contract', (req, res) => {
  res.render('./components/installmentContract/index.ejs' , { title : 'Installment Contract'});
});
app.get('/add-contract', (req, res) => {
  res.render('./components/addContract/index.ejs' , { title : 'Add Contract'});
});

//routes
app.use('/api/fullcontract', FullcontractRo);
app.use('/api/property', PropertyRo);


app.listen(port, () => console.log(`App đang lắng nghe trên cổng ${port}`));