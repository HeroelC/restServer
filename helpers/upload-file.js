const path = require('path');

const uploadFile = ( files ) => {

    return new Promise ( ( resolve, reject ) => {
        const { file } = files;

        const uploadPath = path.join( __dirname, '../uploads/', file.name );
     
        file.mv( uploadPath, ( err ) => {
            if( err ) reject( err )
     
            resolve( 'Archivo cargado exitosamente' );
        })
    } )

}


module.exports = {
    uploadFile
}