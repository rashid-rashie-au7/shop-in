let mongoose = require('mongoose');

let PrdtSchema = mongoose.Schema({
    prdtid: String,
    sellerid :String,
    prdtname : String,
    descn: String,
    price : {
        type:Number,
        default:0},
    brand : String,
    offer: {
        type:Number,
        default:0},
    catgy:String,
    qty: {
        type:Number,
        default:0},
    sold: {
        type:Number,
        default:0},
    gstper : {
        type:Number,
        default:0}, 
    imgpath1 : String,
    imgpath2: String,
    video : String,
    active :{
        type:String,
        default:1
    },
    date: {
        type: Date,
        default: Date.now
    }
    
});


module.exports = mongoose.model("prdts",PrdtSchema);