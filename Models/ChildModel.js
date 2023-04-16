const mongoose = require("mongoose");

const {AutoIncrementID} = require("@typegoose/auto-increment");


const schema = new mongoose.Schema({
    _id:Number,
    ChildName:String,
    Age:Number,
    Level: String,
    Address: {
      City: String,
      Street: String,
      Building: String
    }
})


schema.plugin(AutoIncrementID,{});

// mapping
 mongoose.model("childs",schema);