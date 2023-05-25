const express = require("express");

const { getAccesToRoute } = require("../middlewares/authorization/auth");
const { addNewComment, getAllComments, deleteComment} = require("../controllers/comment");


const router = express.Router({mergeParams:true});



router.post("/", [getAccesToRoute], addNewComment);
router.get("/", getAllComments);
router.delete("/:comment_id", getAccesToRoute, deleteComment);



module.exports = router;