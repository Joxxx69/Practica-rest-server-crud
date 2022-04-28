const { Router } = require('express');
const { check } = require('express-validator');
const controller = require('../controllers/categories.controller');
const { existeCategoriaId } = require('../helpers/db-validator');
const router = Router();
const { validarJWT, validarCampos, esAdminRol, tieneRol } = require('../middlewares/validar.middleware');

/**
 * * {{url}}/api/categorias
 * 
*/


//- Obtener todas las categorias - publico
router.get('/listcategorias', [
    validarJWT,
    tieneRol('USER_ROLE','ADMIN_ROLE','VENTAS_ROLE'),
    validarCampos
],controller.obtenerCategorias)
 

//- Obtener una categoria por id - publico
router.get('/one/:id', [
    validarJWT,
    tieneRol('USER_ROLE','ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
],controller.obtenerCategoriaId);

//- Crear categoria - privado - cualquier persona con un token valido
router.post('/crear/categoria', [
    validarJWT,
    tieneRol('USER_ROLE','ADMIN_ROLE','VENTAS_ROLE'),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], controller.crearCategoria);

//- Actualizar - privado - cualquiera con token valido
router.put('/actualizar/:id', [
    validarJWT,
    tieneRol('USER_ROLE','ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaId),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
],controller.actualizarCategoria);

//! Borrar una categoria - Admin
router.delete('/delete/:id', [
    validarJWT,
    esAdminRol,
    check('id','No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
],controller.borrarCategoria); 

module.exports = router; 








