const { Router } = require('express');
const router = Router();
const controller = require('../controllers/buscar.controller');


router.get('/:coleccion/:termino',controller.buscar);


module.exports = router;  