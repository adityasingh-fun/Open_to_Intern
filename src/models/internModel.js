const mongoose = require("mongoose");

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim:true,
        lowercase: true,
        unique:true,
        required:true,
        validate:{
            validator:function(email){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/.test(email)
            },message:"Please provide a valid email address",isAsync:false
        }
    },
    mobile:{
        type: String,
        trim:true,
        unique:true,
        required:true,
        validate:{
            validator:function(mobile){
                return /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(mobile)
            },message:"Please provide a valid mobile number",isAsync:false
        }
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Intern',internSchema)