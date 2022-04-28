const { Router } = require('express');
const {check} = require('express-validator');
const { chargeArchive,updateFile, showImage, updateFileCloudinary } = require('../controllers/uploads.controller');
const { allowedCollections } = require('../helpers/db-validator');
const {validarCampos, validateFile} = require('../middlewares/validar.middleware') ;
const router = Router();

router.post('/charge/archive', [
    validateFile
], chargeArchive);
router.put('/:collection/:id', [
    validateFile,
    check('id', 'invalid mongo id').isMongoId(),
    check('collection').custom(collection => allowedCollections(collection, ['users', 'products'])),
    validarCampos
], updateFileCloudinary);
//], updateFile);
router.get('/:collection/:id', [
    check('id', 'invalid mongo id').isMongoId(),
    check('collection').custom(collection => allowedCollections(collection, ['users', 'products'])),
    validarCampos
],showImage);
  
module.exports = router;  