
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const confirmation = new Schema({
    email:{
        type:String,
    },
    confirm:{
        type:String,
    }

})
const confirmSchema = mongoose.model("confirmation",confirmation);

module.exports = confirmSchema