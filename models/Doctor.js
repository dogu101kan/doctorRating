const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = require("./Comment");

const doctorSchema = new Schema({
    name : {
        type : String,
        requierd : [true, "Please provide a name"],
    },
    place : {
        type : String,
        requierd : [true, "Please provide a place"],
    },
    adress : {
        type : String,
        requierd : [true, "Please provide a adress"],
    },
    profession : {
        type : String,
        requierd : [true, "Please provide a profession"],
    },
    specialty : {
        type : String,
        requierd : [true, "Please provide a specialty"],
    },
    about : {
        type : String,
        required : [true, "Please provide a about"],
        minlength : [20, "Please provide a title at least 20 characters"]
    },
    phoneNr : {
        type : Number,
    },

    createdAt : {
        type : Date,
        default : Date.now
    },
    
    commentId : [{
        type : mongoose.Schema.ObjectId,
        ref : "Comment"
    }],

    commentCount : {
        type : Number,
        default : 0
    },

    star : {
        type : String,
        default : 0
    }
});


module.exports = mongoose.model("Doctor", doctorSchema);