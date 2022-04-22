const { request,response } = require("express");
const Usuario = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generarJWT } = require("../helpers/jwt.helpers");
const { googleverify } = require("../helpers/google-verify.helpers");


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


const googleSignIn = async(req=request,res=response) => {
    const {id_token}= req.body;
    try {
        const {nombre,img,correo} = await googleverify(id_token);
        console.log({nombre,img,correo})
        let usuario = await Usuario.findOne({correo});
        console.log(usuario)
        if(!usuario){
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password:'123456',
                img,
                rol:'ADMIN_ROLE', 
                google:true 
            };
            console.log(data)
            usuario = new Usuario(data);
            console.log('2');
            await usuario.save();
            console.log('3');
        }
        // Si el usuario en DB
        if(!usuario.estado){
            console.log('4')
            return res.status(401).json({msg:'Hable con el administrador, usuario bloqueado'})
        }
        console.log('5')
        // Generar el JWT
        const token = await generarJWT(usuario.id)
        console.log('6')
        res.json({msg:'todo bien! Google sign in',usuario,token});
    } catch (err) {
        res.status(400).json({msg:'El token no se pudo verificar'});
    }
}

module.exports={
    login,
    googleSignIn
}
