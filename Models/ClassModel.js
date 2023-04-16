const mongoose = require("mongoose");


const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;


const schema = new mongoose.Schema({

    _id: Number,
    ClassName: {type: String , unique:true},
    // Supervisor: ObjectId,
    Supervisor:{type:String, ref:"teachers"}, //ref:"CollectionName"
    Children: [Number]

});


//mapping
mongoose.model("classes",schema);
