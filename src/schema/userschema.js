const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
  
   phonenumber:{
      type: String,
      required: true,
      unique: true,
      match: /^\d{10}$/
   },
   imagepath:{

       type: String,
       default: 'default_user.jpg'  // default image for users who haven't uploaded one yet
 
   }

},
{
    timestamps: true
}
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;