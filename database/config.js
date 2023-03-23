const moongose = require('mongoose');

const dbConnection = async() =>{

    try {

        await moongose.connect( process.env.MONGODB_ATLAS );
        
        console.log('Conexion a la base de datos completada correctamente');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion a la base de datos');
    }

}



module.exports = {
    dbConnection
}