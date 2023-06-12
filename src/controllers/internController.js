const internModel = require('../models/internModel');
const mongoose = require('mongoose');

const isValidRequestBody = function(requestBody){
    return Object.keys(requestBody).length > 0;
}

const isValid = function(value){
    if(typeof value === "undefined" || value === null){
        return false;
    }
    if(typeof value === "string" && value.trim().length === 0){
        return false;
    }
    return true;
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const createIntern = async function(req,res){
    try{
        const requestBody =req.body;

        if(!isValidRequestBody(requestBody)){
            return res.status(400).send({status:false,message:"Invalid request params. please provide intern details"})
        }

        // Extract params
        const {name,email,mobile,collegeId} = req.body;

        // checking validations 

        if(!isValid(name)){
            return res.status(400).send({status:false,message:"Intern name is required"});
        }

        if(!isValid(email)){
            return res.status(400).send({status:false,message:"email is required"});
        }

        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            return res.status(400).send({status:false,message:"Email should be a valid email"});
        }

        if(!isValid(mobile)){
            return res.status(400).send({status:false,message:"Mobile number is required"});
        }

        if(!(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(mobile))){
            return res.status(400).send({status:false,message:"Mobile number is not valid"})
        }

        if(!isValid(collegeId)){
            return res.status(400).send({status:false,message:"College Id is required"});
        }

        if(!isValidObjectId(collegeId)){
            return res.status(400).send({status:false,message:`${collegeId} is not a valid college Id`});
        }

        let checkEmail = await internModel.findOne({email:email,isDeleted:false})
        if(checkEmail){
            return res.status(400).send({status:false,message:"Email is already registered"});
        }

        let checkMobile = await internModel.findOne({mobile:mobile,isDeleted:false})
        if(checkMobile){
            return res.status(400).send({status:false,message:"Mobile number is alreay registered"});
        }

        // validation ends

        let createData = await internModel.create(req.body);
        res.status(201).send({status:true,data:createData})



    }
    catch(error){
        res.status(500).send({status:false,message:error.message})
    }
};


module.exports = {createIntern}