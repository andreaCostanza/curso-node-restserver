const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;;
        this.usersPath = '/api/users';
        
        // Conectar a base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();
        
        // Rutas de la aplicacion
        this.routes();
    };

    async connectDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // directorio publico
        this.app.use( express.static('public') );
    };

    routes() {

        this.app.use(this.usersPath, require('../routes/users'))
    };

    listen() {

        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en puerto:', this.port );
        });
    };


};

module.exports = Server;