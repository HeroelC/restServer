const {
    Router
} = require('express');
const {
    check
} = require('express-validator');

const {
    login, googleSignIn
} = require('../controllers/auth');

const {
    validateRequest
} = require('../middlewares/validate-input');

const router = Router();

router.post('/login', [
    check('mail').isEmail(),
    check('password', "La contraseña es obligatoria").not().isEmpty(),
    validateRequest
], login);

router.post('/google', [
    check('id_token', 'id_token es obligatorio').not().isEmpty(),
    validateRequest
], googleSignIn)

module.exports = router;