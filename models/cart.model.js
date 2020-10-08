let mongoose = require('mongoose');

let cartSchema = mongoose.Schema({
    prdtid: String,
    sellerid :String,
    buyerid :String,
    qty : Number,
    cartid :String,
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("cart",cartSchema);