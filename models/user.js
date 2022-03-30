import mongoose from "mongoose";


var UserSchema = new mongoose.Schema({
  name:String,
  email:String, 
  password:String,
});

export const User = mongoose.model('User', UserSchema);
