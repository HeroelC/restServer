const { response } = require('express');

const { uploadFile } = require('../helpers/upload-file');

const loadFile = async( req, res = response ) => {

   if ( !req.files || Object.keys( req.files ).length === 0 || !req.files.file ){
       return res.status(400).json({ msg: 'No hay archivos que subir '});
   }

   await uploadFile( req.files ).then( msg => {
       return res.json({ msg });
   }, err => {
       return res.status(500).json({ err });
   })
}

module.exports = {
    loadFile
}