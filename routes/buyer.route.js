var express = require('express');
var router = express.Router();
const buyerController  = require('../controllers/buyer.controller');

const {isAuth,isBuyer,requireSignin,userById,productById} = require('../controllers/auth.controller')


router.param("userId",userById)
router.param("productId", productById);


/*GET for product listing */
router.get('/buyerhome',buyerController.productlisting);

/*GET Product related listing */
router.get('/similiar/:productId',buyerController.listRelated);

/*POST METHOD FOR SEARCHING */
router.post('/search',buyerController.listBySearch);

/*GET Detail Product */
router.get('/detailproduct/:productId',buyerController.detailProduct);

/*POST method Add to Cart */
router.post('/addcart/:userId/:productId',requireSignin,isAuth,isBuyer,buyerController.addtoCart);

/*GET Cart page */
router.get('/mycart/:userId',requireSignin,isAuth,isBuyer,buyerController.viewCart);

/*Remove Cart Page*/
router.get('/removecart/:userId/:productId',requireSignin,isAuth,isBuyer,buyerController.removeCart);

/*GET method Wishlist  */
router.get('/wishlist/:userId',requireSignin,isAuth,isBuyer,buyerController.wishlist);

/* POST Wishlist Page */
router.post('/mywishlist/:userId/:productId',requireSignin,isAuth,isBuyer,buyerController.mywishlist);

/*POST  Remove cart*/
router.get('/removewishlist/:userId/:productId',requireSignin,isAuth,isBuyer,buyerController.removeWishlist);

/*POST Update Cart */
router.post('/updatecart/:userId/:productId',requireSignin,isAuth,isBuyer,buyerController.updateqty);

/*GET checkoutlist */
router.get('/checkout/:userId',requireSignin,isAuth,isBuyer,buyerController.checkoutlist);

/* POST CHECKOUT */
router.post('/checkout/:userId',requireSignin,isAuth,isBuyer,buyerController.checkout);

/* GET Profile */
router.get('/profile/:userId',requireSignin,isAuth,isBuyer,buyerController.myprofile);

/* UPDATE profile */
router.post('/profile/:userId',requireSignin,isAuth,isBuyer,buyerController.updateProfile);

/* GET Search */
router.get('/productsearch',buyerController.listSearch);

router.get('/payment/:user',buyerController.payment);

router.post('/payment/:paymentId',buyerController.pay)

router.get('/myorders/:userId',requireSignin,isAuth,isBuyer,buyerController.myorders)

router.post('/createpdf',buyerController.CreatePdf)

router.get('/fetchpdf',buyerController.getPdf)

module.exports = router;