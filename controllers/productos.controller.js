const { response,request } = require('express');
const Producto = require('../models/producto.model');

//* CrearProducto

const crearProducto = async (req = request, res = response) => {
    console.log('1');
    try {
        const { estado,nombre, ...data } = req.body
        const productoDB = await Producto.findOne({ nombre });
        if (productoDB) return res.status(400).json({ msg: `El producto ${productoDB} ya existe` });
        nombre.toUpperCase();
        data.usuario =req.usuario._id
        const producto = new Producto({nombre,...data});
        await producto.save();
        res.status(201).json({producto});
    } catch (err) {
        res.status(400).json({msg:'Existe un error al crear el producto', err});
    }
}

const obtenerProductoId = (req= request,res=response) => {
    const { id } = req.params;
    Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .then(producto => res.status(200).json({ producto }))
        .catch(err => res.status(400).json({msg:'Existe un error al obtner el producto', err }));
}

const obtenerProductos = (req= request,res=response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = {estado:true}
    Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria','nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    .then(([total,productos])=> res.status(400).json({total,productos}))
    .catch(err=> res.status(400).json({msg:'Existe un error al listar los productos', err}))
}

const actualizarProducto = (req= request,res=response) => {
    const { id } = req.params;
    const { estado,nombre, ...data } = req.body;
    data.usuario = req.usuario._id;
    nombre.toUpperCase();
    Producto.findByIdAndUpdate(id,{nombre,...data},{new:true})
        .then(producto=> res.status(200).json({producto}))
        .catch(err=> res.status(400).json({msg:'Existe un error al actualizar',err}));
}

const eliminarProducto = (req= request,res=response) => {
    const { id } = req.params;
    Producto.findByIdAndUpdate(id, { estado: false }, { new: true })
        .then(producto=> res.status(201).json({ producto }))
        .catch(err=> res.status(400).json({msg:'Existe un error al actualizar',err}));
}


module.exports = {
  crearProducto,
  obtenerProductoId,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto,
};