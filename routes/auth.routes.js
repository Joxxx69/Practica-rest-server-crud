const { Router } = require("express");
const router = Router();
const { check } = require('express-validator');
const controllers = require('../controllers/auth.controller');
const { validarCampos } = require("../middlewares/validar.middleware");

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contrasena es obligatoria').notEmpty(),
    validarCampos
],controllers.login);
router.post('/google',[
    check('id_token','id_token es necesario').notEmpty(),
    validarCampos
],controllers.googleSignIn);



module.exports = router;








