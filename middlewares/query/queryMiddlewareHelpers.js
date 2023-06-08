const searchHelper = (query, req) => {

    if ( req.query.name || req.query.profession || req.query.place){
        const searchObject = {};

        const regex = new RegExp(req.query.name, "i");
        const regex2 = new RegExp(req.query.profession, "i");
        const regex3 = new RegExp(req.query.place, "i");
        searchObject["name"] = regex;
        searchObject["profession"] = regex2;
        searchObject["place"] = regex3;

        return query.where(searchObject);
    }
    return query;
};


const doctorSortHelper = (query, req) => {

    const sortKey = req.query.sortBy;
    
    if (sortKey === "most-star"){
        return query.sort("-star");
    }
    if (sortKey === "-most-star"){
        return query.sort("star");
    }
    if (sortKey === "most-rated"){
        return query.sort("-commentCount");
    }
    if (sortKey === "-most-rated"){
        return query.sort("commentCount");
    }
    return query;

};



const paginationHelper = async (model, query, req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page -1) * limit;
    const endIndex = page * limit;

    const pagination = {};

    const total = await model.countDocuments();

    if (startIndex > 0){
        pagination.previous = {
            page : page -1,
            limit : limit
        };
    }
    if (endIndex < total){
        pagination.next = {
            page : page +1,
            limit : limit
        };
    }
    console.log(total, "Total")
    return {
        query : query.skip(startIndex).limit(limit),
        pagination : pagination
    };
};
module.exports = {
    searchHelper,
    doctorSortHelper,
    paginationHelper,
}