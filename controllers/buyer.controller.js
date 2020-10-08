const buyer = require('../models/buyer.model');
const prdt = require('../models/prdt.model');
const seller = require('../models/seller.model');
const cart = require('../models/cart.model');
const wishlist =  require('../models/wishlist.model');
const order = require('../models/order.model');
const orderItems = require('../models/orderItems.model');
const { errorHandler } = require('../helpers/dbErrorHandler');
var request = require('request');
const Razorpay = require('razorpay');
const Axios = require('axios')
const pdf = require('html-pdf');
const pdfTemplate = require('../templates');

const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

const  buyerController ={}

/*Product Listing GET method */
buyerController.productlisting = async(req,res,next)=>{
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    prdt.find()
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'

                });
            }
        const inStock = products.filter(x => x.active == 1);
        res.json(products);
    });
};

/*Similar products GET method */
buyerController.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 4;
    let prdtid =req.product.prdtid
    prdt.find({ prdtid: { $ne: prdtid }, catgy: req.product.catgy })
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json(products);
        });
};
   
/*Product Details  */
buyerController.detailProduct = async(req,res,next)=>{
    return res.json(req.product);
};

/* Add to cart post method */
buyerController.addtoCart = async(req,res,next)=>{
    if(req.profile.userid){
    let buyerid = req.profile.userid
    let prdtid = req.product.prdtid
    let prdts = await prdt.findOne({prdtid})
    let sellerid = prdts.sellerid
    if(prdts.active==1){ 
        let qty = 0, data, seq ;
        let finddata = await cart.findOne({prdtid,buyerid})
        const cartData = await cart.find().sort({cartid:-1})
        if(cartData.length == 0){
             seq = "CRT001"        
        }else{
            let id = (Number(cartData[0].cartid.slice(3,7))+1).toString()
            let targetLength = 4-id.length
            let cid = id.padStart(targetLength, 0)
            seq = "CRT"+cid
        }
        if(finddata)
            qty = (finddata.qty)+1
        else{
            data = new cart({ 
                cartid:seq,
                prdtid,
                buyerid ,
                sellerid,
                qty: 1
            })
        }
        try {
            if(qty == 0){
                await data.save()
            }else{
                await cart.update({prdtid,buyerid:userid},{qty:qty})}
            return res.status(200).json({message:`Successfully added to your Cart`})
        } catch (error) {
            return res.status(201).json({message:`Error while adding to cart ${error}`})
        }
    }else {
        return res.status(201).json({message:`Sorry!!!!!! PRODUCT OUT OF STOCK. Please Check back later`})
    } 
}else{
    return res.status(201).json({message:`Please login to continue.`})
}
};

/* GET method for view cart  */
buyerController.viewCart = async(req,res,next)=>{
    
    let buyerid = req.profile.userid
    let arr =[]
    if(buyerid){
        let cartData = await cart.find({buyerid})
        let obj ={}
        for(var i=0; i<=cartData.length-1; i++){
            let prdts= await prdt.findOne({prdtid:cartData[i].prdtid})
            obj  = JSON.parse(JSON.stringify(prdts))
            obj['cartqty']= cartData[i].qty
            arr.push(obj)
            console.log(arr)
        }
        if(arr.length>0){
            return res.json(arr)
        }else{
            return res.status(201).json({message:`Your cart is empty`})
        }
    }else{
        return res.status(201).json({message:`Please login to continue.`})
    }
       
}

   /*Removing from Cart */
buyerController.removeCart = async(req,res,next)=>{
    let buyerid = req.profile.userid
    let prdtid = req.product.prdtid
    console.log("remove cart   ","buyerid /n", buyerid, "/n user==",req.user," /n prdtid=== ",prdtid," /n  prodct",req.product)
    if(buyerid && prdtid){
        await cart.deleteOne({prdtid,buyerid})
        res.status(200).json({message:`Successfully deleted product from cart`})
    }else if(buyerid){
        return res.status(201).json({message:`Please login to continue.`})
    } 
}

/* For Cart update */
buyerController.updateqty= async(req,res,next)=>{
    console.log("HEREE")
    let buyerid = req.profile.userid
    let prdtid = req.product.prdtid
    let flag = req.query.status
    if(buyerid && prdtid ){
        let finddata = await cart.findOne({prdtid,buyerid})
        if(flag == 1){
            // let prdtdata = await prdt.findOne({prdtid})
            // if(prdtdata.qty!= 0){
                await cart.update({prdtid,buyerid},{qty:(finddata.qty)+1})
           // }
        }else if(flag==0){
            await cart.update({prdtid,buyerid},{qty:(finddata.qty)-1})
            let cartData = await cart.findOne({prdtid,buyerid})
            let qty = cartData.qty
            if(qty==0){
                await cart.deleteOne({cartid:cartData.cartid})
            }
        }
        return res.status(200).json({message:`Sucessfully updated cart`})
    }else if(!buyerid){
        return res.status(201).json({message:`Login to continue`})
    }
}; 


/* GET Method for buyer wishlist*/
buyerController.wishlist = async(req,res,next)=>{
   
    if(req.profile.userid){
        let buyerid = req.profile.userid
        let arr =[]
        let wishlistProduct = await wishlist.find({buyerid})
        for(var i=0; i<=wishlistProduct.length-1; i++){
            let prdts= await prdt.findOne({prdtid:wishlistProduct[i].prdtid})
            arr.push(prdts) 
        }
        try {
            return res.status(200).json(arr)
        } catch (error) {
            return res.send(error)
        }
    }else{
        return res.status(201).json({message:`Please login to continue.`})
    }    
};

/*POST METHOD for adding to wishlist*/
buyerController.mywishlist = async(req,res,next)=>{
    let buyerid = req.profile.userid
    let prdtid = req.product.prdtid
    console.log("post wish   ","buyerid /n", buyerid, "/n user==",req.user," /n prdtid=== ",prdtid," /n  prodct",req.product)
    
    if(buyerid ){
        let data = await wishlist.findOne({prdtid,buyerid}) 
        if(!data){
            const wishlistData = await wishlist.find().sort({wishid:-1})
            if(wishlistData.length == 0){
                seq = "WST001"        
            }else{
                let id = (Number(wishlistData[0].wishid.slice(3,7))+1).toString()
                let targetLength = 4-id.length
                let wid = id.padStart(targetLength, 0)
                seq = "WST"+wid
            }
            const data = new wishlist({ 
                wishid:seq,
                prdtid,
                buyerid
            })
            try {
                await data.save()
                return res.status(200).json({message:`Product Successfully added to wishlist`})
            } catch (error) {
                return res.status(404).json({message:`Something went wrong ${error}`})
            }
        }else if(data){
            return res.status(200).json({message:'Product already added to wishlist'})
        }
    }else{
        return res.status(201).json({message:`Please login to continue.`})
    } 
};

/*Removing from Wishlist */
buyerController.removeWishlist = async(req,res,next)=>{
    let buyerid = req.profile.userid
    let prdtid = req.product.prdtid
    if(buyerid && prdtid){
      await wishlist.deleteOne({prdtid,buyerid})
        return res.status(200).json({message:`Product sucessfully removed from wishlist.`})
    }else if(!buyerid ){
        return res.status(201).json({message:`Please login to continue.`})
    } 
}


 /* Viewing the Checkout page */
buyerController.checkoutlist = async(req,res,next)=>{
    let buyerid = req.profile.userid
    if(buyerid){
        const arr=[] ; 
        let buyerData = await buyer.findOne({buyerid}) 
        let cartData = await cart.find({buyerid})
        let sub_total = 0,tax_excluded =0 ,tax_amount= 0,offer=0,cal={},total=0
        for(var i=0; i<=cartData.length-1; i++){
            let prdts= await prdt.findOne({prdtid:cartData[i].prdtid})
            let p1 =JSON.parse(JSON.stringify(prdts))
            p1['cartid']=cartData[i].cartid
            p1['cartqty']=cartData[i].qty
            sub_total = ((cartData[i].qty*prdts.price)+sub_total)
            tax_excluded = (prdts.price/((prdts.gstper/100)+1)*cartData[i].qty)+tax_excluded
            tax_amount = (sub_total-tax_excluded)+tax_amount
            offer =((prdts.offer/100*prdts.price)+offer)
            total = ((sub_total-offer)+total)
            p1['tax_amount'] = tax_amount
            //tax excluded price  = item price / ((tax rate /100) + 1 ) 
            arr.push(p1) 
        } 
        cal['sub_total'] = sub_total.toFixed(2) 
        cal['tax_excluded'] = tax_excluded.toFixed(2) 
        cal['tax_amount'] =tax_amount.toFixed(2)  
        cal['offer'] = offer.toFixed(2) 
        cal['total'] = total.toFixed(2) 
        try {
           return res.json({results:arr,userinfo:buyerData,calculation:cal}) 
        } catch (error) {
            res.send(error)
        }  
    }else{
        res.status(201).json({message:`Please login to continue.`})
    }
};

/*Post method for buyer checkout  */
buyerController.checkout= async(req,res,next)=>{
    let buyerid = req.profile.userid
    let pid = req.query.pid
    if(buyerid ){
        const arr =[]
        const orderid = await order.find().sort({oid:-1})
        let strid
        if(orderid.length == 0){
            strid = "OID001"        
        }else{
            let id = (Number(orderid[0].oid.slice(3,7))+1).toString()
            let trg_len = 4-id.length
            let oid = id.padStart(trg_len, 0)
            strid = "OID"+oid
        }
        let cartData =await cart.find({buyerid})
        let sub_total = 0,tax_excluded =0 ,tax_amount= 0,disc=0,cal={},total=0
        for(var i=0; i<=cartData.length-1; i++){
            let prdts= await prdt.findOne({prdtid:cartData[i].prdtid})
            let sellerData= await seller.findOne({sellerid:prdts.sellerid})
            let offerprice = (prdts.price) -((prdts.price * prdts.offer)/100)
            sub_total = ((cartData[i].qty*prdts.price)+sub_total)
            tax_excluded = (prdts.price/((prdts.gstper/100)+1)*cartData[i].qty)+tax_excluded
            tax_amount = (sub_total-tax_excluded)+tax_amount
            disc =((prdts.offer/100*prdts.price)+disc)
            total = ((sub_total-disc)+total)
            let order_Item = new orderItems({
                oid:strid,
                buyerid,
                seller:sellerData.shop,
                prdtname:prdts.prdtname,
                imgpath1 :prdts.imgpath1,
                price: prdts.price,
                offer:offerprice,
                catgy:prdts.catgy,
                brand:prdts.brand,
                total: offerprice*cartData[i].qty,
                qty : cartData[i].qty
            })
            await order_Item.save() 
        }

        let order_Details = new order({
            oid:strid,
            buyerid ,
            transid : pid,
            subtotal : sub_total.toFixed(2) ,
            disc: disc.toFixed(2) ,
            extradisc:0.00,
            shipping : 0.00,
            tax : tax_amount.toFixed(2) ,
            total : total.toFixed(2),
        })
        await order_Details.save() 

        await cart.deleteMany({buyerid})
        return res.status(200).json({message:`Your order is succesfull.`})
    }else{
        return res.send('Please login to continue.')
    }
};

/* Profile page for buyer */
buyerController.myprofile =  async(req,res,next)=>{
    let buyerid = req.profile.userid
    if(buyerid){
        let buyerData=await buyer.findOne({buyerid})
        return res.status(200).json(buyerData)
    }else{
        res.status(201).json({message:`Please login to continue.`})
    }   
}

/* Update method for buyer profile */
buyerController.updateProfile =  async(req,res,next)=>{
    let buyerid = req.profile.userid
    await buyer.updateOne({buyerid},{
            lastname: (req.body.lastname).charAt(0).toUpperCase() + (req.body.lastname).slice(1),
            home : (req.body.home).charAt(0).toUpperCase() + (req.body.home).slice(1),
            street:  (req.body.street).charAt(0).toUpperCase() + (req.body.street).slice(1),
            phone:  req.body.phone,
            gender:  req.body.gender,
            state : ( req.body.state).charAt(0).toUpperCase() + (req.body.state).slice(1),
            city:  (req.body.city).charAt(0).toUpperCase() + (req.body.city).slice(1),
            pin:  req.body.pin,
            po:  (req.body.po).charAt(0).toUpperCase() + (req.body.po).slice(1)
        }, {new : true}).exec((err,data)=>{
            if (err){
                return res.status(400).json({
                    error: 'Something went wrong'
    
                });
    
            }return res.status(200).json({message:'Successfully updated profile'})
        })
   
}

/*DELETE Buyer */
buyerController.deleteUser =async(req,res,next)=>{
    let buyerid = req.profile.userid
    await buyer.update({buyerid},{active:0}).exec((err,data)=>{
        if (err){
            return res.status(400).json({
                error: 'Something went wrong'

            });

        }return res.status(200).json({message:'Successfully updated profile'})
    })
} 

/* Search products */
buyerController.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
prdt.find(findArgs)
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

buyerController.listSearch = (req, res) => {
    if (req.query.search) {
        SearchData = (req.query.search)
            prdt.find({prdtname: new RegExp(SearchData, 'i') }, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            return res.json(products);
        });
    }
};

buyerController.payment = async(req,res,next)=>{
    let buyerid = req.params.user
    let total = parseInt(req.query.total)
    
    let cartData = await cart.find({buyerid})
    try {
        const options = {
          amount: total*100, 
          currency: "INR",
          receipt: "receipt#1",
          payment_capture: 0,
        };
        instance.orders.create(options, async function (err, order) {
        if (err) {
            console.log(err)
          return res.status(500).json({
            message: "Something Went Wrong",
          });
        }
      return res.status(200).json(order);
     });
    } catch (err) {
      return res.status(500).json({
        message: "Something Went Wrong",
      });
     }
}

buyerController.pay =(req,res,next)=>{
    let total = req.query.total
    try {
        return request(
         {
         method: "POST",
         url: `https://${process.env.RAZOR_PAY_KEY_ID}:${process.env.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
         form: {
            amount: total * 100, // amount == Rs 10 // Same As Order amount
            currency: "INR",
          },
        },
        async function (err, response, body) {
        if (err) {
          return res.status(500).json({
             message: "Something Went Wrong",
           }); 
         }
          console.log("Status:", response.statusCode);
          console.log("Headers:", JSON.stringify(response.headers));
          console.log("Response:", body);
          return res.status(200).json(body);
        });
        } catch (err) {
         return res.status(500).json({
          message: err,
       });
      }
    
}

/* GET myorders for buyer */
buyerController.myorders= async(req,res,next)=>{
    let buyerid = req.profile.userid 
    let orders = await order.find({buyerid})
    let arr = [],arr2=[]
    for(var i = 0; i<=orders.length-1; i++){
        let obj =JSON.parse(JSON.stringify(orders[i]))
        obj['date']=(new Date(obj['date'])).toLocaleDateString('en-GB')
        arr.push(obj)
    }
    let order_items = await orderItems.find({buyerid})
    for(var i = 0; i<=order_items.length-1; i++){
        let obj1 = JSON.parse(JSON.stringify(order_items[i]))
        arr2.push(obj1)   
    }
        res.json({order:arr,orderitem:arr2})  
};

buyerController.CreatePdf=async(req, res,next) => {
    console.log('here')
    let orderid = req.query.oid
    console.log('orderiddd===  ',orderid)
    let orders = await order.findOne({oid:orderid})
    console.log('ordersss===  ',orders)
    let order_items = await orderItems.find({oid:orderid})
    console.log('ordersss Iteemmmms===  ',order_items)
    let sellerData = await seller.findOne({shop:order_items[0].seller})
    let buyerData = await buyer.findOne({buyerid:orders.buyerid})
    console.log(orders.buyerid,"buyerdataaa ",buyerData)
    pdf.create(pdfTemplate(orders,order_items,sellerData,buyerData), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
};

buyerController.getPdf = async (req, res) => {
    var path = require('path');
    let reqPath = path.join(__dirname, '../')
    console.log(reqPath,"pathh")
    res.sendFile(`${reqPath}/result.pdf`)
};



module.exports = buyerController;

