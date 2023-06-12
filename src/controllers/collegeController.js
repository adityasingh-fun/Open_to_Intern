const collegeModel = require("../models/collegeModel");
const internModel = require('../models/internModel')
const checkValidUrl = require('valid-url');
const axios = require('axios');

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) {
        return false;
    }
    if (typeof value === "string" && value.trim().length === 0) {
        return false;
    }
    return true;
}

const createCollege = async function (req, res) {
    try {
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters please provide college details" })
        }

        // Extract params
        const { name, fullName, logoLink } = req.body;       // Object destructuring
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "College name is required" })
        }

        if (!isValid(fullName)) {
            return res.status(400).send({ status: false, message: "College's full name must be present" })
        }

        if (!isValid(logoLink)) {
            return res.status(400).send({ status: false, message: "Logo link must be present" })
        }

        if (!checkValidUrl.isWebUri(logoLink.trim())) {
            return res.status(400).send({ status: false, message: "Please enter a valid link" })
        }

        // let checkUrl = await axios.get(logoLink)
        // .then(()=> longUrl)
        // .catch(()=> null)

        // if(!checkUrl){
        //     return res.status(400).send({status:false,message:"The url you are providing is invalid URL"})
        // }

        let data = await collegeModel.create(requestBody);
        res.status(201).send({ status: true, data: data })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const getInternDetails = async function (req, res) {
    try {
        let abbreviatedName = req.params.collegeName;

        let college = await collegeModel.findOne({ name: abbreviatedName });
        if (!college) {
            return res.status(404).send({ status: false, message: `No college exists with name ${college.name}` });
        }

        let interns = await internModel.find({ collegeId: college._id });
        if (interns.length === 0) {
            return res.status(404).send({ status: false, message: `No interns found for the college ${college.name}` })
        }

        const responseData = {
            name: college.name,
            fullName: college.fullName,
            logoLink: college.logoLink,
            interns: interns
        }
        res.status(200).send({ data: responseData });
    }
    catch(error){
        res.status(500).send({status:false,message:error.message})
    }
}

module.exports = { createCollege, getInternDetails }