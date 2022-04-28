const Categoria = require("../models/categoria.model");
const Producto = require("../models/producto.model");
const Role = require("../models/role.model");
const Usuario = require('../models/user.model');

//TODO: user validators
const esRoleValido= async(rol='')=>{
    const existeRol = await Role.findOne({rol});   
    if (!existeRol) throw new Error(`El rol ${rol} no esta registrado en la base de datos `); 
    return true;
}
const emailExiste = async(correo='')=>{
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) throw new Error(`El correo ${correo} ya se encuentra ocupado`);
    return true;
}
const existeUsuarioId = async(id='')=>{
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) throw new Error(`El id: ${id} no existe`);
    return true;
}

//TODO: category validators 
const existeCategoriaId = async(id='') => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) throw new Error(`No existe la categoria con el id  ${id}`);
    return true;
}

//TODO: product validators

const existeProductoId = async (id = '') => {  
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) throw new Error(`No existe la categoria con el id ${id}`);
    return true;
}

//TODO: upload-collection validators

const allowedCollections = async (collection='',collections=[]) => {
    const include = collections.includes(collection);
    if (!include) throw new Error(`Collection ${collection} not allowed, --> allowed collections ${collections}`);
    return true;
}



module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioId,
    existeCategoriaId,
    existeProductoId,
    allowedCollections

}










