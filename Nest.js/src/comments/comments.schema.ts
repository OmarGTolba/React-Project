import * as mongoose from 'mongoose';

export const commentSchema = new mongoose.Schema({
 comment:{ type: String, required: true },
 blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  } 
});