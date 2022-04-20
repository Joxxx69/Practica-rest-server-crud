const Role = require("../models/role.model");
const Usuario = require('../models/user.model');

const esRoleValido= async(rol='')=>{
    const existeRol = await Role.findOne({rol});   
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos `)
    } 
}

const emailExiste = async(correo='')=>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${correo} ya se encuentra ocupado`);
    }
}
const existeUsuarioId = async(id='')=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id: ${id} no existe`);
    }
}



module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioId
}










