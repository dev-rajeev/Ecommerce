const Product= require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError')
const ApiFeatures = require('../utils/apiFeatures');



// create Product------------admin                                          //method 1
// exports.createProduct = async (req,res,next)=>{
//     const product = await Product.create(req.body);
//     res.status(201).json({
//         success:true,
//         product
//     })
// }

// use catchAsyncError to create Product                                       //method 2
exports.createProduct = catchAsyncError(async (req,res,next)=>{

    req.body.user = req.user.id

    const product = await Product.create(req.body);
    res.status(201).json({
            success:true,
            product
         })
})





//GET All Product
// exports.getAllProducts= async(req,res)=>{
     
//     const product = await Product.find()
//     res.status(200).json({
//         success:true,
//         product
//     })
// }



exports.getAllProducts= catchAsyncError( async(req,res)=>{

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeature= new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const product = await apiFeature.query;
    res.status(200).json({
        success:true,
        product
    })
})





// GET product Details
// exports.getProductDetails = async(req,res,next)=>{

//     const product = await Product.findById(req.params.id)

//     if(!product){
//         return  next (new ErrorHandler("Product not found", 404))                           // next is a callback function.

//          //after using the Error Handler we remove this code 

//         // res.status(500).json({
//         //     success:false,
//         //     message:'product not found'
//         // })
//     }
//     res.status(200).json({
//         success:true,
//         product
//     })
// }



exports.getProductDetails = catchAsyncError( async(req,res,next)=>{

    const product = await Product.findById(req.params.id)

    if(!product){
        return  next (new ErrorHandler("Product not found", 404))                           // next is a callback function.
    }
    res.status(200).json({
        success:true,
        product,
        productCount
    })
})



// update product ----admin(access)
// exports.upadteProduct= async(req,res,next)=>{
    
//     let product=Product.findById(req.params.id);

//     if(!product){

//         return next (new ErrorHandler("Product not found", 404)) 

//         // res.status(200).json({
//         //     success:false,
//         //     message:'product not found'
//         // }) 
//     }
//     product= await Product.findByIdAndUpdate(req.params.id, req.body,{
//         new:true,
//         runValidators:true,
//         useFindAndModify:false
//     });
//     res.status(200).json({
//         success:true,
//         product
//     })
// }



exports.upadteProduct= catchAsyncError( async(req,res,next)=>{
    
    let product=Product.findById(req.params.id);

    if(!product){

        return next (new ErrorHandler("Product not found", 404)) 
    }
    product= await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
})



// Delete Product--

// exports.deleteProduct = async(req,res,next)=>{
//     const product = await Product.findById(req.params.id)

//     if(!product){

//         return next (new ErrorHandler("Product not found", 404))

//         // return res.status(500).json({
//         //     success:false,
//         //     message:'product not found'
//         // })
//     }
//     await product.remove()

//     res.status(200).json({
//         success:true,
//         message:'product deleted successfully'
//     })
// }



exports.deleteProduct = catchAsyncError( async(req,res,next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){

        return next (new ErrorHandler("Product not found", 404))

    }
    await product.remove()

    res.status(200).json({
        success:true,
        message:'product deleted successfully'
    })
})