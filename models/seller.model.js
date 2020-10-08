let mongoose = require('mongoose');

let registerSchema = mongoose.Schema({
    firstname: String,
    lastname : String,
    email: String,
    sellerid : String,
    gstin : String,
    phone : Number,
    shop : String,
    street : String,
    state:String,
    city: String,
    pin : Number,
    po : String,
    active: {
        type:Number,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("seller",registerSchema);