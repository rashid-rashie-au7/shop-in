let User = require('../models/usr.model')
let Product = require('../models/prdt.model')
const expressJwt = require('express-jwt');

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty: "auth"
});


exports.userById = (req, res, next, userid) => {
    User.findOne({userid}).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        console.log(req.profile)
        next();
    });
};

exports.isAuth = (req, res, next) => {
    console.log(req.auth)
    console.log(req.profile)
    let user = req.profile && req.auth && req.profile.userid == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};

exports.isSeller = (req, res, next) => {
    if (req.profile.usertype === 1) {
        return res.status(403).json({
            error: 'Seller access denied'
        });
    }
    next();
};

exports.isBuyer = (req, res, next) => {
    if (req.profile.usertype === 0) {
        return res.status(403).json({
            error: 'Buyer access denied'
        });
    }
    next();
};

exports.productById = (req, res, next, prdtid) => {
    Product.findOne({prdtid}).exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: 'Product not found'
                });
            }
            req.product = product;
            next();
        });
};