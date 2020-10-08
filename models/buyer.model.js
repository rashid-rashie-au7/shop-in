let mongoose = require('mongoose');

let registerSchema = mongoose.Schema({
    firstname: String,
    lastname : String,
    email: String,
    buyerid : String,
    home : String,
    street : String,
    phone : Number,
    state:String,
    city: String,
    pin : Number,
    po : String,
    gender : String,
    active :{
        type:Number,
        default:1
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("buyer",registerSchema);