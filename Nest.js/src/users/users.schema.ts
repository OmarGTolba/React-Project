import * as mongoose from "mongoose"
export let usersSchema = new mongoose.Schema({

    name:String,
    image:String,
    age:Number,
    email:String,
   password:String,
   isAdmin: {
    type: Boolean,
    required: false
},
favorite: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog' 
}]
})