const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  username: {
      type: String,
      unique: true, 
  },
  password: {
      type: String
  },
  highScore: {
      type: Number,
      default: 0,
  },
  avgScore: {
      type: Number,
      default: 0,
  },
  gamesPlayed: {
      type: Number,
      default: 0,
  },
  maxLevel:{
      type:Number,
      default:0
  }
  
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

