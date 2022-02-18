const { User, Role, Category, Product } = require('../models');

const isRoleValid = async(role) => {

    const exitsRol = await Role.findOne({ role });

    if ( !exitsRol ) throw new Error(`El rol ${role} no existe`);
}

const isExitsMail = async ( mail ) => {

    // Verificar si el correo existe
    const isMailExist = await User.findOne({
        mail
    });

    if (isMailExist) throw new Error(`El email ${mail} ya existe`);
}

const isExistsUserByID = async ( id ) => {

    // Verificar si usuario existe
    const isExistsUser = await User.findById(id);

    if ( !isExistsUser ) throw new Error(`El usuario con ID: ${ id } no existe`);
}

const isExistsCategoryID = async( id ) => {

    const isExitsCategory = await Category.findById( id );

    if( !isExitsCategory) throw new Error(`La categoria con ID ${ id } no existe`);
}

const isExistsProductID = async( id ) => {

    const isExitsProduct = await Product.findById( id );

    if( !isExitsProduct ) throw new Error(`El producto con ID ${ id } no existe`);
}

module.exports = {
    isRoleValid,
    isExitsMail,
    isExistsUserByID,
    isExistsCategoryID,
    isExistsProductID
}