
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type:String,
        required:[true, "E-email requied"],
        unique:[true,"name must be unique"],
        lowercase:true,
    },
    password:{
        type:String,
        required:[true, "password required"],
    },
    active:{
        type:Boolean,
        default:false
    },


})

UserSchema.pre("save" , async function(next){
    this.password = await bcrypt.hash(this.password ,12);
    next()
})

const userSchema = mongoose.model("Users",UserSchema);

module.exports = userSchema