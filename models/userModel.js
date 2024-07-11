import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'USER'
    },
    password: {
        type: String,
        required: true
    }
});

const blogSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId ,
        ref: 'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})
const User = mongoose.model('User', userSchema);
const Blog = mongoose.model('Blog' , blogSchema);

export { User , Blog };
