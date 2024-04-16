import * as mongoose from "mongoose"
export let messageSchema = new mongoose.Schema({
   
    content: { type: String, required: true },
 
    createdAt: { type: String, require:true },
     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
})