const User = require("../../models/User");
// const Question = require("../../models/Question");

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

const checkQuestionExist = asyncErrorWrapper(async(req, res, next) =>{
    // "/:id" nin içerisindeki id yi alabilmek için req içerisindeki params a bak
    const question_id = req.params.id || req.params.question_id;

    const question = await Question.findById(question_id);

    if(!question){
        return next(new CustomError("There is no such a question with that id."), 400);
    };

    // aşağıdakini getSingleUser içerisinde bir daha user ı database den çekmeye çalışmamak için yazdım.
    req.data = question;
    next();
});


module.exports = {checkUserExist, checkQuestionExist, checkDoctorExist};
