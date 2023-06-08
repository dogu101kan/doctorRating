const asyncErrorWrapper = require("express-async-handler");
const { searchHelper, populateHelper, questionSortHelper, paginationHelper } = require("./queryMiddlewareHelpers");

const commentQueryMiddleware = function(model){
    return asyncErrorWrapper(async function(req, res, next){
        let query = model.find({ doctor : req.params.id });
        
        // Search

        const paginationResult = await paginationHelper(model, query, req);

        query = paginationResult.query;
        const pagination = paginationResult.pagination;

        const queryResults = await query;

        res.queryResults={
            success : true,
            count : queryResults.length,
            pagination : pagination,
            data : queryResults
        };
        
        next();
    });
};

 module.exports = commentQueryMiddleware;