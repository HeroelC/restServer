const { response } = require('express');
const { Product } = require('../models');

const createProduct = async(req, res = response) => {

    const { estado, usuario, ...body } = req.body;

    const productDB = await Product.findOne({ name: body.name });
    
    if( productDB ) return res.status(400).json({ msg: `El producto ${ body.name } ya existe`});

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.uid 
    }

    const product = new Product( data );

    await product.save();

    res.status(201).json({
        product
    })
} 

const getProducts = async(req, res = response) => {

    await Product.find()
                .populate( "user" )
                .populate( "category" )
                .then ( products => {
        res.status(200).json( products );
    })

}

const getProduct = async(req, res = response) => {

    const { id } = req.params;

    const product = await Product.findById( id );
    
    res.status(200).json({
        product
    })

}

const updateProduct = (req, res = response) => {

}

const deleteProduct = (req, res = response) => {

}

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}