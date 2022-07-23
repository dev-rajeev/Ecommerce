const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/userModel');
const sendToken = require('../utils/sendJwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto')


// Register a User
exports.registerUser = catchAsyncError(async(req,res,next)=>{

    const {name,email,password} =req.body;

    const user = await User.create({
        name,email,password,
        avtar:{
            pubilc_id:'This is a sample id',
            url:"profilepicurl"
        }
    })

     // we create sendJwtToken For That-----------------
    // const token = user.getJWTToken();
    // res.status(200).json({
    //     success:true,
    //     // user,
    //     token
    // })


    // so instead of that---- we use
    sendToken(user,201,res);

})







// Login User
exports.loginUser= catchAsyncError(async(req,res,next)=>{

    const {email,password}= req.body;

    //  checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHandler("please enter email & password",400))
    }

    const user= await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    
    // we create sendJwtToken For That-----------------
    // const token = user.getJWTToken();

    // res.status(200).json({
    //     success:true,
    //     // user,
    //     token
    // })



    // so instead of that---- we use
    sendToken(user,200,res);

})


//Logout User
exports.logout = catchAsyncError(async(req,res,next)=>{

    res.cookie("tookie",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

     res.status(200).json({
        success:true,
        message:"Logged out"
        })
})




// Forgot Password
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email})

    if(!user){
        return next ( new ErrorHandler("User not found", 404));
    }

    // get ResetPassword Token
    const resetToken= user.getResetPasswordToken();

    await user.save({validateBeforSave : false});


    // create URL for reset Password
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message  = `your password reset token is :- \n\n ${resetPasswordUrl } \n\nIf you have not requested this email
    then please ignore it`;

    try {
        
        await sendEmail({

            email:user.email,
            subject:` Ecommerce Password Recovery`,
            message
        })

        res.status(200).json({
            success: true,
            message:` Email sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforSave : false});

        return next(new ErrorHandler(error.message, 502))
    }
})






// Reset Password
exports.resetPassword = catchAsyncError(async(req,res,next)=>{


    // Creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.tokken).digest("hex");

    const user = await User.findOne({
        resetPasswordToken, 
        resetPasswordExpire:{$gt : Date.now()},
    })

    if(!user){
        return next ( new ErrorHandler("Reset password token is invalid or has been expried", 404));
    }


    if(req.body.password !== req.body.confirmPassword){
        return next ( new ErrorHandler("password doesn't match", 404));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;


    await user.save();

    sendToken(user,200,res)


})



// GET User Details----------
exports.getUserDetails = catchAsyncError(async( req,res,next)=>{

    const user = await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })
})




// / update user password----------
exports.updatePassword = catchAsyncError(async( req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect",400))
    }

    if(req.body.newpassword !== req.body.confirmPassword){
        return next ( new ErrorHandler("password doesn't match", 400));
    }

    user,password = req.body.newpassword;
     await user.save()


     sendToken(user,200,res)
})




// / update user profile----------
// exports.updateProfile = catchAsyncError(async( req,res,next)=>{

//     const user = await User.findById(req.user.id).select("+password")

//     const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

//     if(!isPasswordMatched){
//         return next(new ErrorHandler("Old password is incorrect",400))
//     }

//     if(req.body.newpassword !== req.body.confirmPassword){
//         return next ( new ErrorHandler("password doesn't match", 400));
//     }

//     user,password = req.body.newpassword;
//      await user.save()


//      sendToken(user,200,res)
// })


