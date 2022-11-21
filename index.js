const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const {mongoose} = require('./db.js');


var app=express();
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:4200'}));
app.use('/employee',require('./models/controllers/employeeController'));
app.listen(3000,()=>console.log('Server started at port: 3000'));

