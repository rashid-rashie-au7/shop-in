let mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');


let registerSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    usertype : Number,
    verify: {
        type:Number,
        default: 0
    },
    salt: String,
    userid:String,
    date: {
        type: Date,
        default: Date.now
    }
});

registerSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });
registerSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};


module.exports = mongoose.model("user",registerSchema);