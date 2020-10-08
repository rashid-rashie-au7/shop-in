let mongoose = require('mongoose');

let orderItemSchema = mongoose.Schema({
    oid: String,
    buyerid:String,
    seller :String,
    prdtname : String,
    imgpath1:String,
    catgy : String,
    brand : String,
    price : Number,
    offer: Number,
    qty: Number,
    total : Number,
    status: {
        type: String,
        default: 'Order Placed'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("orderitems",orderItemSchema);