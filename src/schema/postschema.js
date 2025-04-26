const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
   
  },


  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      text: {
        type: String,
        required: true
      },
      time: {
        type: Date,
        default: Date.now
      }
    }
  ],
  time: {
    type: Date,
    default: Date.now
  }
});

const POSTMODEL = mongoose.model('Post', postSchema);
module.exports = POSTMODEL;
