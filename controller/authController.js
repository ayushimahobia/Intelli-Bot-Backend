const errorHandler = require('../middlewares/errorMiddleware');
const  userModel = require('../models/usermodel');
const errorResponse = require('../utils/errorResponse');


//JWT Token
exports.sendToken = (user,statusCode,res) =>{
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        success: true,
        token,
    });
};
exports.registerController = async(req,res,next)=>{
    try {
        const {username,email,password} = req.body
        //existing users
        const existingEmail = await userModel.findOne({email})
        console.log(existingEmail)
        if(existingEmail!=null){
            return next(new errorResponse('Email is already register',401))
        }
        const  user = await userModel.create({username,email,password})
        this.sendToken(user,201,res)
    } catch (error) {
        console.log(error);
        next(error)
    }
}
//login
exports.loginController = async(req,res,next)=>{
    try {
        const {email,password} = req.body
        //validations
        if(!email || !password){
            return next(new errorResponse('please provide email and password'));
        }
        const user = await userModel.findOne({email})
        if(!user){
            return next(new errorResponse('Invalid creditial',401))
        }
        const isMatch = await user.matchPassword(password)
        if(!isMatch){
            return next(new errorResponse('Invalid Password',401))
        }
        //res
        this.sendToken(user,200,res);
    } catch (error) {
        console.log(error)
        next(error)
    }
};
//Logout
exports.logoutController = async(req,res)=>{
    res.clearCookie('refreshToken')
    return res.status(200).json({
        success:true,
        message: 'LogOut SuccesFully'
    })
}