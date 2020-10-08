let mongoose = require('mongoose');

let wishlistSchema = mongoose.Schema({
    wishid:String,
    prdtid: String,
    buyerid :String,
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("wishlist",wishlistSchema);