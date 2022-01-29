const { Router } = require('express');
const { check } = require('express-validator');

const { userGet, userPut, userPost, userDelete } = require('../controllers/user');
const { validateRequest } = require('../middlewares/validate-input');

const { isRoleValid, isExitsMail, isExistsUserByID } = require('../helpers/db-validators');

const {
    validateJWT 
} = require('../middlewares/validate-jwt')

const router = Router();

router.get('/', userGet);

router.put('/:id', [
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom( isExistsUserByID ),
    check('role').custom( isRoleValid ),
    validateRequest
], userPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de más de 5 letras').isLength({min: 6}),
    check('mail', 'El correo no es válido').isEmail(),
    //check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('mail').custom( isExitsMail ),
    check('role').custom( isRoleValid ),
    validateRequest
], userPost);

router.delete('/:id', [
    validateJWT,
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom( isExistsUserByID ),
    validateRequest
], userDelete);

module.exports = router;