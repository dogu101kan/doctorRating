const Comment = require("../models/Comment");
const Doctor = require("../models/Doctor");
const asyncErrorWrapper = require("express-async-handler");




const addNewComment = asyncErrorWrapper(async(req, res, next) => {

    const reqDoctor = req.data;
    let beforeRating = parseFloat(req.data.star);

    if(reqDoctor.commentCount === 0){
        beforeRating = parseFloat(0);
    };

    beforeRating *= reqDoctor.commentCount;
    
    const comment = await Comment.create({
        ...req.body,
        user : req.user.id,
        doctor : req.params.id
    });

    reqDoctor.commentCount +=1 ;
    reqDoctor.commentId.push(comment.id);

    beforeRating += parseFloat(req.body.star);
    beforeRating /= reqDoctor.commentCount;

    reqDoctor.star = beforeRating;

    reqDoctor.save();

    res.status(200).json({
        succes : true,
        data : comment
    });
});

const getAllComments = asyncErrorWrapper(async(req, res, next) => {
    // const comment = await Comment.find({ doctor : req.params.id });

    // res.status(200).json({
    //     succes : true,
    //     data : comment
    // });

    res.status(200).json(res.queryResults);

});

const deleteComment = asyncErrorWrapper(async(req, res, next) => {
    const comment = await Comment.findOneAndDelete({ _id : req.params.comment_id });

    res.status(200).json({
        succes : true,
        data : comment
    });
});














module.exports = {
    addNewComment, 
    getAllComments, 
    deleteComment
}