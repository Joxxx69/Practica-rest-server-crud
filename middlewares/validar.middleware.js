const { validationResult } = require("express-validator");

const validarCampos = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    } 
    next();
}

// este middleware validara el json que enviemos,para evitar que colapse la ejecucion
const validarJSON = (err,req,res,next) => {
    if(err instanceof SyntaxError && err.status === 400 && 'body' in err){
        return res.status(400).json({status:400,msg:err.message})
    }
    next();
}

module.exports={
    validarCampos,
    validarJSON
}