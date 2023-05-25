const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title : {
        type : String,
        requierd : true,
        maxlength : [10, "Please provide a title max 10 characters"]
    },

    comment : {
        type : String,
        minglength : [5, "Please provide a comment at least 5 characters"],
        maxlength : [100, "Please provide a title max 10 characters"]
    },

    user : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : "User"
    },

    star : {
        type : Number,
        min : 1,
        max : 5
    },
    
    doctor : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : "Doctor"
    },

    createdAt : {
        type : Date,
        default : Date.now
    },
});

module.exports = mongoose.model("Comment", CommentSchema);
