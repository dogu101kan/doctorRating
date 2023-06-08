const asyncErrorWrapper = require("express-async-handler");
const Doctor = require("../models/Doctor");
const { model } = require("mongoose");


const getAllDoctors = asyncErrorWrapper(async(req, res, next) => {

        res.status(200)
    .json(res.queryResults);
});

const getSingleDoctor = (req, res, next) => {

    res.status(200)
    .json({
        success : true,
        data : req.data
    });
};

const createNewDoctor = asyncErrorWrapper(async(req, res, next) => {   

    const doctor = await Doctor.create({
        ...req.body,
    });

    return res.status(200)
    .json({
        success : true,
        data : doctor
    });
});



module.exports = {
    getAllDoctors,
    createNewDoctor,
    getSingleDoctor
}