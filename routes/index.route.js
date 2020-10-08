var express = require('express');
var router = express.Router();
const userController  = require('../controllers/user.controller');
const {userSignupValidator} = require('../validators/user.validation')

/* Get Register Page */
router.get('/register',userController.register)

/* POST Register  */
router.post('/register',userSignupValidator,userController.registerUser);

/*GET LOGIN */
router.get('/login', userController.login);

/* POST LOGIN */
router.post('/login', userController.loginUser);

/* GET Logout */
router.get('/logout',userController.logout);

/* GET Category */
router.get('/categories',userController.listCatgy);



module.exports = router;