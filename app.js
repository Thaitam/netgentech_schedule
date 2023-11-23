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

app.get('/', (req, res) => {
  res.send('server is running');
});

app.use(expressLayouts)
app.set('layout', './layout/managementLayout')
app.set('view engine', 'ejs')

//render
app.get('/home', (req, res) => {
  res.render('index' , { title : 'Homepage'});
});

app.get('/addContract', (req, res) => {
  res.render('./components/addContract/index.ejs' , { title : 'addContract'});
});

//routes
app.use('/api/fullcontract', FullcontractRo);
app.use('/api/property', PropertyRo);


app.listen(port, () => console.log(`App đang lắng nghe trên cổng ${port}`));