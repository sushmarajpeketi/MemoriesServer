import mongoose from "mongoose";

const postSchema = mongoose.Schema({
        title : {
            type : String,
            // require: true
        },
        message: {
            type : String,
            // require: true
        },
        creator:{
            type : String,
            // require: true
        },
        tags:{
            type : [String],
            // require: true
        },
        selectedFile:{
            type : String,
            // require: true
        },
        likeCount :{
            type: Number,
            default: 0
        },
        createdAt : {
            type: Date,
            default: new Date()
        }
})

const PostMessage = mongoose.model('PostMessage', postSchema)
export default PostMessage;