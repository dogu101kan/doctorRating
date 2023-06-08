const express = require("express");

const { getAccesToRoute, getAdminAccess } = require("../middlewares/authorization/auth");
const { addNewComment, getAllComments, deleteComment } = require("../controllers/comment");
const { checkCommentExist } = require("../middlewares/database/databaseErrorHelpers");
const commentQueryMiddleware  = require("../middlewares/query/commentQueryMiddleware");
const Comment = require("../models/Comment");


const router = express.Router({mergeParams:true});



router.post("/", [getAccesToRoute], addNewComment);
router.get("/", [commentQueryMiddleware(Comment)], getAllComments);
router.delete("/:comment_id", [ getAccesToRoute, getAdminAccess, checkCommentExist ], deleteComment);


module.exports = router;