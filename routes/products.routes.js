const { Router } = require('express');
const { check} = require('express-validator');
const controller = require('../controllers/productos.controller');
const { existeProductoId, existeCategoriaId } = require('../helpers/db-validator');
const router = Router();
const { validarJWT, validarCampos, esAdminRol, tieneRol } = require('../middlewares/validar.middleware');

// * Obtener Productoss
router.get('/listado', controller.obtenerProductos);

// * Obtener un Producto
router.get('/producto/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
], controller.obtenerProductoId);

// * CrearProductos 
router.post('/crear/producto', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaId),
    validarCampos
], controller.crearProducto);

//- Actualizar Producto
router.put('/actualizar/producto/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
], controller.actualizarProducto);

//! Eliminar Producto
router.delete('/eliminar/producto/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
],controller.eliminarProducto);
 
module.exports = router; 
   
    