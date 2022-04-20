const router = require("express").Router();
const Product = require("../models/Product");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const multer  = require('multer');
const upload = multer({ dest: 'assets/images/uploads/' });

//Product Image video file Upload
router.post('/profile', upload.single('filename'), function (req, res, next) {
    // req.file is the `filename` file
    // req.body will hold the text fields, if there were any
    
    res.status(200).json(req.file);
});


//Create Product
router.post("/", verifyTokenAndAdmin, async (req, res) =>{
    const newProduct = new Product(req.body);
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
  
});

//Update Product Details
router.put("/:id",  verifyTokenAndAdmin, async (req, res) =>{   
    try{
        const updatedProduct =  await Product.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body,
            }, 
            {new: true}
            );
        res.status(200).json(updatedProduct);
    }catch(err){
        res.status(500).json(err);
    }
});

//Delete Single Product
router.delete("/:id",verifyTokenAndAdmin, async (req, res) =>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been Deleted");
    }catch(err){
        res.status(500).json(err);
    }
});

//Get Single Product every one can see no admin authentication required
router.get("/find/:id", async (req, res) =>{
    try{
        const product =  await Product.findById(req.params.id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
});

//Get All Products
router.get("/", async (req, res) =>{
    const qnew = req.query.new;
    const qcategory = req.query.categories;
    try{
        let products;

        if(qnew){
            products = await Product.find().sort({createdAt: -1}).limit(1);
        }else if(qcategory){
            products = await Product.find({
                categories: {
                    $in: [qcategory],
                },
            });
        }else {
            products = await Product.find();
        }
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
});



module.exports = router