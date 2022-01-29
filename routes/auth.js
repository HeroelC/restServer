const {
    Router
} = require('express');
const {
    check
} = require('express-validator');

const {
    login
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

module.exports = router;