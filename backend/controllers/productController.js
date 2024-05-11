import productModel from "../models/productModel.js";
import fs from 'fs'

//add product

const addProduct = async (req,res) => {

    let image_filename = `${req.file.filename}`;

    const product = new productModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        oldprice:req.body.oldprice,
        category:req.body.category,
        image:image_filename
    })

    try {
        await product.save();
        res.json({success:true,message:"Product Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})        
    }
}

//list products

const listProducts = async (req,res) => {
    try {
        const products = await productModel.find({});
        res.json({success:true,data:products})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})        
    }
}

//remove product

const removeProduct = async (req,res) => {
    try {
        const product = await productModel.findById(req.body.id);
        fs.unlink(`uploads/${product.image}`,()=>{})

        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Product Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})        
    }

}

const getProductDetails = async (req, res) => {
    try {
        // Extract product ID from URL parameters
        const productId = req.params.id;

        // Check if productId is valid
        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        // Find product by ID
        const product = await productModel.findById(productId);

        if (!product) {
            // Product not found, send error response
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Product found, send success response with product details
        res.json({ success: true, data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching product details" });
    }
};

  

export {addProduct, listProducts, removeProduct, getProductDetails}