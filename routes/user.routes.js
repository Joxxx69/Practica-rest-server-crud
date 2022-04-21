const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user.controllers');
const { check } = require('express-validator');
const { validarCampos, validarJSON, validarJWT, esAdminRol, tieneRol } = require('../middlewares/validar.middleware');
const { esRoleValido, emailExiste, existeUsuarioId } = require('../helpers/db-validator');

router.get('/get',controllers.usuariosGet);
router.put('/put/:id',[
    check('id','NO es un id valido').isMongoId(),
    check('id').custom(id=>existeUsuarioId(id)),
    check('rol').custom(esRoleValido),
    validarJSON,
    validarCampos
],controllers.usuariosPut);
router.post('/post',[
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('password','El password debe de ser de mas de 6 letras').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(correo=> emailExiste(correo)),    // si emailExiste entra en el throw new ERROR no podra pasar al siguiente middleware
    // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    // check('rol').custom(rol=>esRoleValido(rol)),
    check('rol').custom(esRoleValido),
    validarJSON,
    validarCampos
],controllers.usuariosPost);
router.delete('/delete/:id',[
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROLE','USER_ROLE','VENTAS_ROLE'),  // forma de recibir arguntos en el middleware
    check('id','No es un id de MONGODB').isMongoId(),
    check('id').custom(id=>existeUsuarioId(id)),
    validarCampos
],controllers.usuariosDelete);


module.exports = router;


