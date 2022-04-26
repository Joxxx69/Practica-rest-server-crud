const { request, response } = require('express');
const { isValidObjectId } = require('mongoose');
const Usuario = require('../models/user.model');
const Categoria = require('../models/categoria.model');
const Producto = require('../models/producto.model');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
];

const buscarUsuarios = async ( termino ='',req,res) => {
    const esMongoId = isValidObjectId(termino);

    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({resultado:usuario?[usuario]:[]});
    }
    const regex = new RegExp(termino,'i');
    const usuarios = await Usuario.find({ $or:[{nombre: regex },{correo:regex}],$and:[{estado:true}]});
    return res.json({resultado:usuarios});

}

const buscarCategorias = async(termino='',req,res) => {
    const esMongoId = isValidObjectId(termino);
    if (esMongoId) {
        const categoria = await Categoria.findById(termino).populate('usuario','nombre');
        return res.json({resultado:categoria?[categoria]:[]})
    }
    const regex = new RegExp(termino,'i');
    const categorias = await Categoria.find({nombre:regex, estado:true}).populate('usuario','nombre');
    return res.json({resultado:categorias});

}

const buscarProductos = async(termino='',req,res) => {
    const esMongoId = isValidObjectId(termino);
    if (esMongoId) {
        const producto = await Producto.findById(termino)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre');
        return res.json({resultado:producto?[producto]:[]})
    }
    const regex = new RegExp(termino,'i');
    const productos = await Producto.find({ nombre: regex, estado: true })
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    return res.json({resultado:productos});
}




const buscar = (req = request, res = response) => {
    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({ msg: `Las colecciones permitidas son: ${coleccionesPermitidas}` });
    }
    switch (coleccion) {
      case "usuarios":
            buscarUsuarios(termino, req, res);
        break;
      case "categorias":
            buscarCategorias(termino,req,res);
        break;
        case "productos":
            buscarProductos(termino,req,res);
        break;
      default:
        res.status(500).json({ msg: "Se le olvido hacer esta busqueda" });
        break;
    }

    // res.json({msg:'Buscar.....',coleccion,termino});
}

module.exports = {
    buscar
}  