const Categoria = require("../models/categoria.model");
const Producto = require("../models/producto.model");
const Role = require("../models/role.model");
const Usuario = require('../models/user.model');

//TODO: Validadores para el usuario
const esRoleValido= async(rol='')=>{
    const existeRol = await Role.findOne({rol});   
    if (!existeRol) throw new Error(`El rol ${rol} no esta registrado en la base de datos `); 
}
const emailExiste = async(correo='')=>{
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) throw new Error(`El correo ${correo} ya se encuentra ocupado`);
}
const existeUsuarioId = async(id='')=>{
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) throw new Error(`El id: ${id} no existe`);
}

//TODO: validadores para las categorias 
const existeCategoriaId = async(id='') => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) throw new Error(`No existe la categoria con el id  ${id}`);
}

//TODO: validadores para los productos

const existeProductoId = async (id = '') => {  
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) throw new Error(`No existe la categoria con el id ${id}`);
}



module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioId,
    existeCategoriaId,
    existeProductoId

}










