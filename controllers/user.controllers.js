const { request,response } = require('express');
const Usuario = require('../models/user.model');
const bcrypt = require('bcrypt');

const usuariosGet = async(req= request,res=response, next) => {
    const {limite=5,desde=0} = req.query;
    // const usuarios = await Usuario.find({estado:true})
    //     .skip(parseInt(desde))
    //     .limit(parseInt(limite));
    // const total  = await Usuario.countDocuments({estado:true});

    const [total,usuarios] = await Promise.all([
            Usuario.countDocuments({estado:true}),
            Usuario.find({estado:true})
            .skip(parseInt(desde))
            .limit(parseInt(limite))
    ])


    res.json({msg:'Get api- controlador',usuarios,total});  
}

const usuariosPost = async(req= request,res=response, next) => { 

    const {nombre,correo,password,rol}= req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    // Encriptar la contrasena
    usuario.password = bcrypt.hashSync(password,10);
    // Guardar en la base de datos
    await usuario.save();
    res.json({msg:'Post api- controlador',usuario});
}

const usuariosPut = async(req= request,res=response, next) => {  
    const {id} = req.params;
    const {password,google,correo,...resto}= req.body;
    if(password){
        resto.password = bcrypt.hashSync(password,10);
    } 
    const usuario = await Usuario.findByIdAndUpdate(id,resto,{new:true})
    res.json({msg:'Put api- controlador',usuario});
    
}
const usuariosPatch = (req= request,res=response, next) => {
    res.json({msg:'Patch api- controlador'});
}
const usuariosDelete = async(req= request,res=response, next) => {
    const {id} = req.params;
    // const borrar = await Usuario.findByIdAndDelete(id,{new:true});  // no se debe borrar debido a la integridad referencial, siempre va a existir
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})
    res.json({msg:'Delete api- controlador',usuario});
}

module.exports = {
    usuariosDelete,
    usuariosGet,
    usuariosPatch,
    usuariosPost,
    usuariosPut
}









