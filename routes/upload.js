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
    loadFile
} = require('../controllers/upload');

const router = Router();

router.post('/', loadFile)

module.exports = router;