const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_ATLAS_CNN,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })
// .then(()=>console.log('Se realizo una conexion exitosa'))
// .catch(err=> console.log(err));

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('Conexion establecida con la base de datos')
    } catch (error) {
        console.log(error) 
        throw new Error('Error a la hora de iniciar la base de datos')
    }
}

module.exports = {
    dbConnection
}  