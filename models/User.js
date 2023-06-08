const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
   
    name : {
        type : String,
        required : [true, "Please provide a name"]
    },
    email : {
        type : String,
        required : true,
        unique : [true, 'Please try different email address'],
        match : [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email']
    },
    password : {
        type : String,
        minlength : 6,
        required : [true, "'Please provide a password"],
        select : false // getAllUsers diye fonksiyon yarattığımızda password alanının görünmemesini sağlar
    },
    role : {
        type : String,
        enum : ["user", "admin"],
        default : ["user"]
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    resetPasswordToken : {
        type : String
    },
    resetPasswordTokenExpire : {
        type : Date
    }
});

// UserSchema Methods // Json web token
UserSchema.methods.generateJwtFromUser = function(){
    const {JWT_SECRET_KEY, JWT_EXPIRE} = process.env;
    const payload = {
        id : this._id,
        name : this.name
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY,{
        expiresIn : JWT_EXPIRE
    });
    return token;
};

UserSchema.methods.getResetPasswordTokenFromUser = function(){
    const randomHexString = crypto.randomBytes(15).toString("hex");
    const {RESET_PASSWORD_EXPIRE} = process.env;
    const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex");

    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordTokenExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);
    
    return this.resetPasswordToken;
};


// Pre Hooks
UserSchema.pre("save", function(next) {

    // update işlemlerinde eğer parola değişmemişse tekrar aynı parolayı hashlemesin diye yazdım(mongoose.modified ile)
    if (!this.isModified("password")){
        next();
    }

    bcrypt.genSalt(10,(err, salt)=>{
        if (err) next(err);
        bcrypt.hash(this.password, salt, (err, hash)=>{
            if (err) next(err);
            this.password = hash;
            next();
        })
    })
});


// UserSchema.post("remove", async function() {

//     await Question.deleteMany({
//         user: this._id
//     });
// });

module.exports = mongoose.model("User", UserSchema);