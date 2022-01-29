const Server = require('./models/server');

require('dotenv').config();

/* Inicializamos el servidor, para que este limpio el app.js */
const server = new Server();

server.listen();
