let buyer = require('../models/buyer.model')
let seller = require('../models/seller.model');
let prdt = require('../models/prdt.model')
let order = require('../models/order.model')
let order_details = require('../models/orderItems.model');

let sellerController  = {}

sellerController.add = async(req,res,next)=>{
    return res.status(200).json({message:'You have reached product adding session'})
}


sellerController.addProduct = async(req,res,next)=>{ 
    console.log("bodyyyyyyyy",req.body)       
    let sellerid = req.profile.userid
    let prdts = await prdt.find().sort({prdtid:-1})
    let strid
    if(prdts.length == 0){
        strid = "PRDT001"        
    }else{
        let id = (Number(prdts[0].prdtid.slice(4,7))+1).toString()
        let trg_len = 4-id.length
        let uid = id.padStart(trg_len, 0)
        strid = "PRDT"+uid
    }
    const data = new prdt({ 
        prdtid: strid,
        sellerid : sellerid,
        brand : req.body.brand,
        prdtname: req.body.prdtname,
        descn: req.body.descn,
        price : req.body.price,
        offer: req.body.offer,
        catgy: req.body.category,
        qty : req.body.qty,
        gstper:req.body.gstper,
        imgpath1:req.body.url,
        // imgpath2: req.body.img2,
        video:req.body.video
    })
    try {
        await data.save()
        return res.status(200).json({message:'Product added successfully'})
    } catch (error) {
       res.status(201).json({message:'Error in adding the product'+error})
    }        
};

sellerController.productList = async(req,res,next)=>{
    let sellerid = req.profile.userid
    console.log(sellerid)
    let prdts = await prdt.find({sellerid,active:1})
    // let sellers = await seller.findOne({sellerid}).select({'firstname':1,"_id":0})
    if(prdts.length == 0){
        return res.status(201).json({message:`Hi , Sorry! No products found`})
    }else {
        return res.json(prdts);
    }
}
           
/* Product details update page */
sellerController.update = async(req,res,next)=>{
    let prdts = req.product
    return res.status(200).json(prdts)        
};

/* Product details update page POST method */
sellerController.updateProduct = async(req,res,next)=>{
    let prdtid = req.product.prdtid
    let sellerid = req.profile.userid
    let data = await prdt.update({prdtid},{
        sellerid : sellerid,
        brand : (req.body.brand).charAt(0).toUpperCase() + (req.body.brand).slice(1),
        prdtname: (req.body.prdtname).charAt(0).toUpperCase() + (req.body.prdtname).slice(1),
        descn: (req.body.descn).charAt(0).toUpperCase() + (req.body.descn).slice(1),
        price : req.body.price,
        offer: req.body.offer,
        catgy: req.body.catgy,
        qty : req.body.qty,
        gstper:req.body.gstper,
        video:req.body.video
    }, {new : true})
    return  res.status(200).json({message:'SUCCESSFULLY UPDATED THE DETAILS'})   
};
/* Deleting Product details   */
sellerController.deleteProduct = async(req,res,next)=>{
    let prdtid = req.product.prdtid
    let prdts = await prdt.updateOne({prdtid},{active:0})
    res.status(200).json(prdts)
}

/*GET profile*/
sellerController.profile = async(req,res,next)=>{
    let sellerid = req.profile.userid
    let sellerDetails = await seller.findOne({sellerid})
    return res.status(200).json(sellerDetails)
}
/* seller profile update page post method */
sellerController.sellerProfileDetails = async(req,res,next)=>{
    let sellerid = req.profile.userid
    let data=await seller.update({sellerid},{ 
        firstname: (req.body.firstname).charAt(0).toUpperCase() + (req.body.firstname).slice(1),
        lastname: (req.body.lastname).charAt(0).toUpperCase() + (req.body.lastname).slice(1),
        state: req.body.state,
        city: (req.body.city).charAt(0).toUpperCase() + (req.body.city).slice(1),
        gstnumber : req.body.gstnumber,
        phone : req.body.phone,
        shop : (req.body.shop).charAt(0).toUpperCase() + (req.body.shop).slice(1),
        street : req.body.street,
        pin : req.body.pin,
        po : req.body.po
    })
    return res.status(200).json({message:'Profile updated successfully'})   
};

/*Stock report */
sellerController.stockReport = async(req,res,next)=>{
    let sellerid = req.profile.userid;
    let sellerData = await seller.findOne({sellerid})
    let prdts = await prdt.find({sellerid:sellerData.sellerid})
    return res.status(200).json(prdts)
}

/*SALES REPORT */
sellerController.salesReport =async(req,res,next)=>{
    let fromdate = new Date(req.query.sdate);
    // let fromdate = '2020-09-15T12:30:27.027+00:00'
    let todate = new Date(req.query.edate);
//    let todate = '2020-10-15T12:30:27.027+00:00'
    let sellerid = req.profile.userid;
    let sellerData = await seller.findOne({sellerid})
    let arr = []
    let Sales = await order_details.find({"date":{ $gte:fromdate, $lte:todate},seller:sellerData.shop})
    for(let i=0; i<Sales.length; i++){
        let transId = await order.findOne({"date":{ $gte:fromdate, $lt:todate},oid:Sales[i].oid})
        let buyerData = await buyer.findOne({buyerid:Sales[i].buyerid})
        let obj = JSON.parse(JSON.stringify(Sales[i]))
        obj['addrs']=`${buyerData.home}, ${buyerData.city}, ${buyerData.state}-${buyerData.pin}`
        obj['buyer'] = buyerData.firstname
        obj['transid']=transId.transid
        odate = new Date(Sales[i].date)
        obj['date']= odate.toLocaleDateString('en-GB')
        arr.push(obj)
    } 
    return res.status(200).json(arr)   
}

/*DELETE SELLER */
sellerController.deleteUser =async(req,res,next)=>{

}

sellerController.listOrders = async(req,res,next)=>{
    let sellerid = req.profile.userid;
    let arr =[], obj={}
    let sellerName = await seller.findOne({sellerid})
    let OrderDetails = await order_details.find({seller:sellerName.shop,status:{$ne: "Delivered"}})
    for(let i=0; i< OrderDetails.length; i++){
        let orders = await order.findOne({oid:OrderDetails[i].oid}).select({transid:1,_id:0})
        let Userdata = await buyer.findOne({buyerid:OrderDetails[i].buyerid})
        obj = JSON.parse(JSON.stringify(OrderDetails[i]))
        obj[`transid`]= orders.transid;
        obj['buyername']=Userdata.firstname+' '+Userdata.lastname;
        obj['addrs1'] = `${Userdata.home}, ${Userdata.street}`
        obj['adrs2']=`${Userdata.city}, ${Userdata.po}, ${Userdata.state}-${Userdata.pin}`
        obj['mob']= `${Userdata.phone}`
        arr.push(obj)
    }
    console.log(arr)
    if(arr.length > 0){
        return res.status(200).json(arr)
    }else {
        return res.status(200).json({message:'Sorry No Orders yet'})
    }
}

sellerController.updateOrders = async(req,res,next)=>{
    let sellerid = req.profile.userid;
    let oid = req.query.oid;
    let prdtname = req.query.prdt;
    let status = 'Delivered';
    await order_details.updateOne({oid,prdtname},{status})
    let findOd = await order_details.findOne({oid,prdtname})
    let finddata = await prdt.findOne({prdtname:prdtname})
    console.log('prdtQty==',finddata.qty)
    console.log('OrderQty==',findOd.qty)
    await prdt.updateOne({prdtname:prdtname},{qty:(finddata.qty)-findOd.qty,sold:(finddata.sold)+findOd.qty})
        return res.status(200).json({message:'updated Successfully'});
}
module.exports =sellerController;