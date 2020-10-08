let mongoose = require('mongoose');

let orderSchema = mongoose.Schema({
    oid: String,
    buyerid : String,
    transid : String,
    subtotal : Number,
    disc: Number,
    extradisc:Number,
    shipping : Number,
    tax : Number,
    total : Number,
    
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("order",orderSchema);