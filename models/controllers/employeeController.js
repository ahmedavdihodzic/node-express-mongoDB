const express = require('express');
const { append } = require('express/lib/response');
var router=express.Router();
const res = require('express/lib/response');
const { Employee } = require('../employees');

var ObjectId=require('mongoose').Types.ObjectId;

router.get('/',(req,res)=>{
  Employee.find((err,docs)=>{
    if(!err){res.send(docs);}
    else{console.log('Error in Retriving Employees: ' + JSON.stringify(err,undefined,2));}
  });

});

router.get('/:id',(req,res)=>{
    if(ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
    Employee.findById(req.params.id,{$set:emp},{new:true},(err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in Retriving Employees: ' + JSON.stringify(err,undefined,2));}
    });
})

router.post('/employee',(req,res)=>{
    var emp=new Employee({
        name:req.body.name,
        position:req.body.position,
        office:req.body.office,
        salary:req.body.salary
    });
    emp.save((err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in Retriving Employees: ' + JSON.stringify(err,undefined,2));}
    });
});

router.put('/:id',(req,res)=>{
    if(ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

    var emp={
        name:req.body.name,
        position:req.body.position,
        office:req.body.office,
        salary:req.body.salary
    }
    Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new:true},(err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in update Employees: ' + JSON.stringify(err,undefined,2));}
    });
});


router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
    
    Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in Retriving Employees: ' + JSON.stringify(err,undefined,2));}
    });
});

module.exports=router;