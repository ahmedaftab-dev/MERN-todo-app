const mongoose=require("mongoose")

const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        default: "personal",
        required:true
    },
    completed:{
        type:Boolean,
        required:true,
        default:false
    },
    createdby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
},{timestamps:true})

export default mongoose.model("todos", todoSchema);