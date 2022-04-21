const { request,response } = require("express");
const Usuario = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generarJWT } = require("../helpers/jwt.helpers");


const login = async(req=request,res=response) => {
    const {correo, password} = req.body;
    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({msg: 'Usuario / Password no son correctos - correo '})
        }
        // Si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({msg: 'Usuario / Password no son correctos - estado: false '})
        }
        // verificar la contrasena
        const validarPass = bcrypt.compareSync(password,usuario.password);

        if(!validarPass){
            return res.status(400).json({msg: 'Usuario / Password no son correctos - password '})
        }
        // Generar el JWT
        const token = await generarJWT(usuario.id);
        
        res.json({msg:'post-auth-login',correo,password, token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:'hable con el administrador'});
    }
}

module.exports={
    login
}
