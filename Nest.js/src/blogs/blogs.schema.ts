import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true }, 
  createdAt: { type: String, require:true },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  } , comments: { type: Array }
});