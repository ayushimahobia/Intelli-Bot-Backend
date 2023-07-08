const errorResponse = require('../utils/errorResponse');

const errorHandler = (err,req,res,next) =>{
    let error = {...err}
    error.message = err.message

    // mongoose cast error 
    if(err.name === 'castError'){
        const message = 'Resource Not Found'
        error = new errorResponse(message,404)
    }
    // Duplicate Key Error
    if(err.code === 11000){
        const message ='Duplicate Field value entered'
        error = new errorResponse(message,400)
    }
    //mongoose Validation 
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map((val)=>val.message)
        error = new errorResponse(message,400)
        res.status(error.statusCode || 500).json({
            success: false,
            error : error.message ||'Server Error'
        });
    }
    // next(error);
};

module.exports = errorHandler;