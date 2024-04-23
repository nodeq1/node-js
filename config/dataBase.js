const mongoose = require("mongoose");

const DB = () => {
    mongoose.connect("mongodb+srv://ghaithdrh:8w4cuU7MZdklyZfx@cluster0.pcolro1.mongodb.net/brother?retryWrites=true&w=majority", {
        connectTimeoutMS: 90000
    }).then((res) => {
        console.log("connected successfully");
    }).catch((err) => {
        console.log("connected is not successfully");
    });
}

module.exports = DB;

