let mongoose = require('mongoose');

let catgySchema = mongoose.Schema({
    catgy: String,
});

module.exports = mongoose.model("categories",catgySchema);