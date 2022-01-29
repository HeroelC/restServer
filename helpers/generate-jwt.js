const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.JWT_SECRET_SEED, {
            expiresIn: '4h'
        }, (err, token) => {

            err ? reject( 'No se pudo generar el token' ) : resolve( token );

        })
    })
}

module.exports = {
    generateJWT
}