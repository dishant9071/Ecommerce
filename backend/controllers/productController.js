const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//create Product -->admin
exports.createProduct = catchAsyncErrors(async (req,res)=>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    });
});


//get all products
exports.getAllProducts = catchAsyncErrors(async (req,res)=>{

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
        success:true,
        products,
        productCount
    });
});


// get product details
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{

    product = await Product.findById(req.params.id);
    if(!product)
    {
        return next(new ErrorHandler("product not found",404)); 
    }

    res.status(200).json({
        success:true,
        product
    });
});


//update product --> admin
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{

    let product = await Product.findById(req.params.id);
    if(!product)
    {
        return next(new ErrorHandler("product not found",404)); 
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        product
    });
});


// delete product -->admin
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{

    product = await Product.findById(req.params.id);
    if(!product)
    {
        return next(new ErrorHandler("product not found",404)); 
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    });
});