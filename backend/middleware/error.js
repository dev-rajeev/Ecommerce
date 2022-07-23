const ErrorHandler = require('../utils/errorHandler')                       //    import ErrorHandler

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";


    //worng Mongodb ID error
    if(err.name ==="CastError"){
        const message = `Resourse not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,404)
    }



    // Mongoose duplicate key error
    if(err.code ===11000){
        const message= `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message, 400);
    }


    // Wrong JWT Error
    if(err.name === "JsonWebTokenError"){
        const message= `Json web token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }

    // JWT Exprie error
    if(err.name === "TokenExpireError"){
        const message= `Json web token is Expired, try again`;
        err = new ErrorHandler(message, 400);
    }




    res.status(err.statusCode).json({
        success:false,
        error:err,
        message:err.message,
        // error:err.stack
        // message:err.stack,
    })
}