const { validationResult } = require('express-validator');

const validateRequest = ( req, res, next ) => {

    const errors = validationResult(req);

    if( !errors.isEmpty()) return res.status(400).json({msg: "Ha ocurrido un error", ...errors})

    next();
}

module.exports = {
    validateRequest
}