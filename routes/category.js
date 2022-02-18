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
    createCategory, getCategories, getCategory, updateCategory, deleteCategory
} = require('../controllers/category');

const { isExistsCategoryID } = require('../helpers/db-validators');

const router = Router();

/* Obtener todas las categorias */
router.get('/', [
    validateJWT,
    validateRequest
], getCategories)

/* Obtener una categoria */
router.get('/:id', [
    validateJWT,
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom( isExistsCategoryID ),
    validateRequest
], getCategory)

/* Crear una categoria - privado - cualquier persona con un token válido */
router.post('/', [ 
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateRequest
 ], createCategory)

/* Editar una categoria - privado - cualquiera con token válido */
router.put('/:id', [
    validateJWT,
    check('id').isMongoId,
    check('id').custom( isExistsCategoryID ),
    validateRequest
], updateCategory);

/* Borrar una categoria - admin */
router.delete('/:id', [
    validateJWT,
    check('id').isMongoId(),
    check('id').custom( isExistsCategoryID ),
    validateRequest
], deleteCategory);

module.exports = router;