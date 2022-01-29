const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.userPath = '/api/user';
        this.authPath = '/api/auth';

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
    }

    async connectDatabase(){
        await dbConnection();
    }

    routes(){
        this.app.use( this.authPath, require('../routes/auth') );
        this.app.use( this.userPath, require('../routes/user') );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log("Corriendo en el puerto: ", this.port);
        });
    }
}

module.exports = Server;