const mongoose = require("mongoose");

const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

const bcrypt = require('bcrypt');


//generate schema
const schema = new mongoose.Schema({


  FullName:String,
  Password: {
    type: String,
    required: true,
    match: /^(?=.*[A-Z])(?=.*\d).{8,}$/
  },
  Email: {
    type: String,
    unique:true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    validate: {
      validator: function(v) {
        return mongoose.model('teachers').countDocuments({ Email: v }).exec()
          .then(count => !count);
      },
      message: props => `${props.value} already exists`
    },
  },
  Image: String
});








schema.pre('save', async function(next) {
  try {
      // Generate a salt for hashing the password
      const salt = await bcrypt.genSalt(10);
      // Hash the password using the generated salt
      const hashedPassword = await bcrypt.hash(this.Password, salt);
      // Set the hashed password as the value of the Password field
      this.Password = hashedPassword;
      next();
  } catch (error) {
      next(error);
  }
});




//mapping
mongoose.model("teachers",schema);
