const ErrorHandler = require("../utils/errorhandler");

module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";

    //wrong mongoDB Id error
    if(err.name === "CastError")
    {
        const message = `Source not found. Error: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });

};