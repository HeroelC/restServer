const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.authPath =     '/api/auth';
        this.userPath =     '/api/user';
        this.categoryPath = '/api/category';
        this.productPath =  '/api/product';
        this.uploadPath =   '/api/upload';
        
        // Conectar a base de datos
        this.connectDatabase();

        // Middlewares
        this.middlewares();

        this.routes();
    }

    middlewares(){
        // CORS
        this.app.use ( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        //Directiva, para devolver contenido estatico. 
        this.app.use( express.static('public') );

        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }) );
    }

    async connectDatabase(){
        await dbConnection();
    }

    routes(){
        this.app.use( this.authPath, require('../routes/auth') );
        this.app.use( this.userPath, require('../routes/user') );
        this.app.use( this.categoryPath, require('../routes/category') );
        this.app.use( this.productPath, require('../routes/product'));
        this.app.use( this.uploadPath, require('../routes/upload') );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log("Corriendo en el puerto: ", this.port);
        });
    }
}

module.exports = Server;