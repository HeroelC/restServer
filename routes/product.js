const {
    Router
} = require('express');
const {
    check
} = require('express-validator');

const {
    validateRequest
} = require('../middlewares/validate-input');

const {
    validateJWT 
} = require('../middlewares/validate-jwt');

const {
    createProduct, getProducts, getProduct, updateProduct, deleteProduct
} = require('../controllers/product');
const { isExistsProductID, isExistsCategoryID } = require('../helpers/db-validators');

const router = Router();

/* Obtener todos los productos */
router.get('/', getProducts);

router.get('/:id', [
    validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( isExistsProductID ),
    validateRequest
], getProduct)

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'No es un id valido').isMongoId(),
    check('category').custom( isExistsCategoryID ),
    validateRequest
], createProduct)

router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( isExistsProductID ),
    validateRequest
], updateProduct);

router.delete('/id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( isExistsProductID ),
    validateRequest
], deleteProduct);

module.exports = router;