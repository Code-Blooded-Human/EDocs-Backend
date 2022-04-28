import mongoose from 'mongoose';
import { User } from './user.js';


let Schema = mongoose.Schema


var DocumentSchema = new mongoose.Schema({
  name:String,
  content:[{data:String, updatedAt:{type:Date, default:Date.now}, label:{type:String, default:'No Label'}}],
  owner:{type:Schema.Types.ObjectId, ref:User},
  passwordShaB62:String
});

export const Document = mongoose.model('Document', DocumentSchema);