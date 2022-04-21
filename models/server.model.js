const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const { validarJSON, validarCampos } = require('../middlewares/validar.middleware');


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'
        //Conectar a la base de datos
        
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion

        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }
    middlewares(){
        // CORS
        this.app.use(cors());
        
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio Publico
        this.app.use(express.static('public'));
        this.app.use(validarJSON,validarCampos);
    }
    routes(){
       this.app.use(this.usuariosPath,require('../routes/user.routes'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Conexion exitosa en el puerto ${this.port}`)
        })
        
    }
}

module.exports = Server;