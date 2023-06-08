const User = require("../../models/User");
const Comment = require("../../models/Comment");

const Doctor = require("../../models/Doctor");

const CustomError = require("../../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");



const checkUserExist = asyncErrorWrapper(async(req, res, next) =>{
    // "/:id" nin içerisindeki id yi alabilmek için req içerisindeki params a bak
    const id = req.params.id;

    const user = await User.findById(id);

    if(!user){
        return next(new CustomError("There is no such a user with that id."), 400);
    };

    // aşağıdakini getSingleUser içerisinde bir daha user ı database den çekmeye çalışmamak için yazdım.
    req.data = user;
    next();
});

const checkDoctorExist = asyncErrorWrapper(async(req, res, next) =>{
    // "/:id" nin içerisindeki id yi alabilmek için req içerisindeki params a bak
    const id = req.params.id;

    const doctor = await Doctor.findById(id);

    if(!doctor){
        return next(new CustomError("There is no such a doctor with that id."), 400);
    };

    req.data = doctor;
    
    next();
});

const checkCommentExist = asyncErrorWrapper(async(req, res, next) =>{

    // "/:id" nin içerisindeki id yi alabilmek için req içerisindeki params a bak
    const comment_id = req.params.comment_id;

    const comment = await Comment.findById(comment_id);

    if(!comment){
        return next(new CustomError("There is no such a comment with that id."), 400);
    };

    // aşağıdakini getSingleUser içerisinde bir daha user ı database den çekmeye çalışmamak için yazdım.
    req.data.comment = comment;
    next();
});


module.exports = {checkUserExist, checkCommentExist, checkDoctorExist};
