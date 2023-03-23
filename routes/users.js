const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const { isValidRole, 
        emailExists, 
        userExistsById } = require('../helpers/db-validators'); // validaciones
const { usersGet,
        usersPost, 
        usersPut, 
        usersPatch, 
        usersDelete } = require('../controllers/users'); //controladores



const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password tiene que ser mas de 6 caracteres').isLength({ min: 6}),
    check('email', 'El correo no es valido').isEmail(),
    check( 'email' ).custom( emailExists ),
    //check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isValidRole ), // seria lo mismo que ```...custom( role => isValidRole( role) ) 
    validateFields
], usersPost);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( userExistsById ),
    check('role').custom( isValidRole ),
    validateFields
], usersPut);

router.patch('/', usersPatch);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( userExistsById ),
    validateFields
], usersDelete);







module.exports = router;