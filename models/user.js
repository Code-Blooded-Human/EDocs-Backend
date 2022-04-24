import mongoose from "mongoose";

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  docPasswords: String,
  recentlyVisistedDocs: Array,
});

export const User = mongoose.model("User", UserSchema);
