const jwt = require('jsonwebtoken');

const generarJWT = (uid='') => {
    return new Promise((res,rej)=>{
        const payload ={uid};
        return   jwt.sign(payload,process.env.SECRETTOPRIVATEKEY,{expiresIn:'4h'},(err,token)=>{
            if(err){
                rej('No se pudo generar el token');
            }else{
                res(token)
            }
        })
    });
}

module.exports ={
    generarJWT
}