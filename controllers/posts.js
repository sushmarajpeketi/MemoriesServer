import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'

export const getPosts = async (req,res)=>{

    try{
        const AllPosts = await PostMessage.find();
        console.log("AllPosts inside getPosts" , AllPosts)
       

        res.status(200).json(AllPosts)
    }catch(err){
        console.log("error message for fetching all posts is",err.message)
        res.status(400).json({message:err.message})
    }
    
}

export const createPost = async (req,res)=>{
    const {title,message,creator,tags,selectedFile,likeCount,createdAt} = req.body

    try{
        const newPost = await PostMessage.create({
            title,message,creator,tags,selectedFile,likeCount,createdAt
        })
        res.status(201).json(newPost)
    }catch(err){
            console.log(err.message)
            res.status(409).json({message:err.message})
    }
}

export const updatePost = async(req,res) =>{
    const {id:_id} = req.params
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({data:"No post with that id"});
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,post,{new:true})
    // console.log("the updated post is " ,{...updatedPost,selectedFile:""})
     res.json(updatedPost)

}

export const deletePost = async(req,res)=>{
    const {id:_id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({data:"No post with that id"});
    const deletedPost = await PostMessage.findByIdAndDelete(_id);
    res.status(200).json({deletedPost})
}
export const likePost = async(req,res)=>{
    const {id:_id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({data:"No post with that id"});
    const post = await PostMessage.findById(_id)
    const likedPost = await PostMessage.findByIdAndUpdate(_id,{likeCount:post.likeCount+1},{new:true})
    res.status(200).json(likedPost)
}
