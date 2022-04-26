const { response,request } = require('express');
const Categoria = require('../models/categoria.model');

//- Controlador que crea una categoria
const crearCategoria = async (req = request, res = response) => {
    try {
        const nombre = req.body.nombre.toUpperCase();
        const categoriaDB = await Categoria.findOne({ nombre });

        if (categoriaDB) {
            return res.status(400).json({msg:`La categoria ${categoriaDB.nombre}, ya existe`});
        }
        // generar la data a guardar
        const { _id:uid } = req.usuario;
        const categoria = new Categoria({nombre,usuario:uid});
        await categoria.save();
    
        res.json({ msg: 'post - categoria: se creo la categoria', categoria }); 
        
    } catch (error) {
        res.status(400).json({msg:'existe un error',error});
    }
}


//TODO: obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req=request,res=response) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };
        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .populate('usuario','nombre')
                .skip(Number(desde))
                .limit(Number(limite)) 
        ]);
        res.json({total,categorias});
    } catch (err) {
        res.status(400).json({msg:'Existe un error',err});
    }
}

//TODO: obtenerCategoria - populate {}

const obtenerCategoriaId = async (req = request, res = response) => {
    const { id } = req.params;
    Categoria.findById(id)
        .populate('usuario', 'nombre')
        .then(categoria => res.json({ categoria }))
        .catch(err => res.status(400).json({ err }));
}


//TODO: actualizarCategoria

const actualizarCategoria = async (req = request, res = response) => {
    // try {
    //     const { id } = req.params;
    //     const { nombre, estado, usuario } = req.body;
    //     const categoria = await Categoria.findByIdAndUpdate(id, { nombre, estado, usuario },{new:true});    
    //     res.status(201).json({categoria});
    // } catch (error) {
    //     res.status(400).json({msg:'Existe un error', error});
        
    // }
    const { id } = req.params;
    const {...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    Categoria.findByIdAndUpdate(id,data,{new:true})
        .then(categoria=>res.status(201).json({categoria}))
        .catch(err=>res.status(400).json({err}))


}

//TODO: borrarCategoria

const borrarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const categoriaId = await Categoria.findById(id, { estado: true });
    console.log(categoriaId);
    
    if (!categoriaId) return res.status().json({msg:'La categoria ya no existe'});
    Categoria.findByIdAndUpdate(id, { estado: false }, { new: true })
        .then(categoria => res.json({ categoria }))
        .catch(err => res.status(400).json({ msg: 'Existe un error al eliminar', err }));
}

module.exports={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaId,
    borrarCategoria,
    actualizarCategoria
}