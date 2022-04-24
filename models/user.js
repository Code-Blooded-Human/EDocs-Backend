import mongoose from "mongoose";

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  docPasswords: String,
  recentlyVisitedDocs: { type: Array, default: [] },
});

export const User = mongoose.model("User", UserSchema);
