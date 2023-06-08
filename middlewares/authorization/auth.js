const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken");
const asyncErrorWrapper = require("express-async-handler");
const User = require("../../models/User");


const {isTokenIncluded, getAccesTokenFromHeader} = require("../../helpers/authorization/tokenHelper");

const getAccesToRoute = (req, res, next) => {

    const {JWT_SECRET_KEY} = process.env;    
    if(!isTokenIncluded(req)){
        return next(new CustomError("You re not authorized", 401));
    }

    const accesToken = getAccesTokenFromHeader(req);


    jwt.verify(accesToken, JWT_SECRET_KEY, (err, decoded) => {
        if(err){
            return next(new CustomError("You re not authorized. Token Expired", 401));
        }

        req.user = {
            id : decoded.id,
            name : decoded.name,
        }

        next();
    });
};

const getAdminAccess = asyncErrorWrapper(async(req, res, next) =>{
    
    const {id} = req.user;
    const user = await User.findById(id);
    console.log(user)

    if(user.role !== "admin"){
        return next(new CustomError("Only admins can access this route", 403));
    }

    next();
});


module.exports = {
    getAccesToRoute,
    getAdminAccess
}