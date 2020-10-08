var express = require('express');
var router = express.Router();
const sellerController  = require('../controllers/seller.controller');
const {isAuth,isSeller,requireSignin,userById,productById} = require('../controllers/auth.controller')


router.param("userId",userById)
router.param("productId", productById);


/* Get Register Page */
router.get('/addproduct',sellerController.add)

/* POST Add product  */
router.post('/addproduct/:userId',requireSignin,isAuth,isSeller,sellerController.addProduct);

// /*GET Product Listing */
router.get('/products/:userId',requireSignin,isAuth,isSeller,sellerController.productList);


/* Get product update */
router.get('/updateproduct/:userId/:productId',requireSignin,isAuth,isSeller,sellerController.update);

/* Post product update */
router.post('/updateproduct/:userId/:productId',requireSignin,isAuth,isSeller,sellerController.updateProduct);

/* DELETE Product */
router.post('/deleteproduct/:userId/:productId',requireSignin,isAuth,isSeller,sellerController.deleteProduct);

/*GET profile */
router.get('/sellerProfile/:userId',requireSignin,isAuth,isSeller,sellerController.profile);

/*Update Profile */
router.post('/sellerprofile/:userId',requireSignin,isAuth,isSeller,sellerController.sellerProfileDetails);

/*GET Stock Report */
router.get('/stocks/:userId',requireSignin,isAuth,isSeller,sellerController.stockReport);

/*GET Sales Report */
router.get('/salesreport/:userId',requireSignin,isAuth,isSeller,sellerController.salesReport);

/*GET Stock Report */
router.get('/listorders/:userId',requireSignin,isAuth,isSeller,sellerController.listOrders);

/*GET Stock Report */
router.post('/updateorders/:userId',requireSignin,isAuth,isSeller,sellerController.updateOrders);





module.exports = router;