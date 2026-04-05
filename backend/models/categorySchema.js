import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        default:null,
        index:true,
    }
})

export default mongoose.model("Category", categorySchema);