const { response } = require('express');

const { Category } = require('../models');

const createCategory = async( req, res = response ) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });
    
    if( categoryDB ) return res.status(400).json({ msg: `La categoria ${ name } ya existe`});

    const data = {
        name,
        user: req.uid 
    }

    const category = new Category( data );

    await category.save();

    res.status(201).json({
        category
    })
}

const getCategories = async( req, res = response ) => {

    await Category.find().populate( "user" ).then ( categories => {
        res.status(200).json( categories );
    })
}

const getCategory = async( req, res = response ) => {

    const { id } = req.params;

    const category = await Category.findById( id );
    
    res.status(200).json({
        category
    })
}

const updateCategory = async( req, res = response ) => {

    const { id } = req.params;

    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();

    data.user = req.uid;

    const category = await Category.findByIdAndUpdate( id, { data }, {new : true});

    res.json({
        category
    })
}

const deleteCategory = async( req, res = response ) => {

    const { id } = req.params;

    const categoryDelete = await Category.findByIdAndUpdate( id, { status: false }, {new: true});

    res.json({
        categoryDelete
    });
}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}