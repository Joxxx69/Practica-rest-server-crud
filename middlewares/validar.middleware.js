const { request ,response} = require("express");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user.model');

const validarCampos = (req=request,res=response,next) => {
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

const validarJWT = async(req=request,res=response,next) => {
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({msg:'No hay token en la peticion'}) ;
    }
    try {
        const {uid}=jwt.verify(token,process.env.SECRETTOPRIVATEKEY);
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById({_id:uid});
        if(!usuario){
            return res.status(401).json({msg:'Token no valido - usuario no existe en la base de datos'});
        }
        // verficar si el uid tiene estado en true
        if(!usuario.estado){
            return res.status(401).json({msg:'Token no valido - usuario con estado en false'})
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        res.status(401).json({msg:'token no valido',error})
    }
}
const esAdminRol = (req=request,res=response,next) => {
    if(!req.usuario){
        return res.status(500).json({msg:'Se quiere verificar el rol sin validar el token'});
    }
    const {rol, nombre}= req.usuario;
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({msg:`${nombre} no es administrador- no puede hacer eso`})
    }
    next();
}
const tieneRol = (...roles) => {
    
    return (req=request, res=response,next)=>{
        
        if(!req.usuario){
            return res.status(500).json({msg:'Se quiere verificar el rol sin validar el token'});
        }
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({msg:`El servicio require uno de estos roles ${roles}`})
        }
        next();
    }
}

module.exports={
    validarCampos,
    validarJSON,
    validarJWT,
    esAdminRol,
    tieneRol
}