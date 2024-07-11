import { User , Blog } from "../models/userModel.js";
import { createHashPassword  } from "../utils/bcryptUtil.js";



async function registerUser(data)
{
    try{
        let {username , email ,password} =data;
        password = await createHashPassword(password);
        const user = new User({
            username ,
            password,
            email
        });
        const result = await user.save();
        return result;
    }
    catch(err)
    {
        console.log(err);
    }
    

};

async function getUserByUsername(name)
{
    let user = await User.findOne({username:name});
    return user;

};


async function createBlog (userId, title , content)
{
    let blogdata = new Blog({
        userId,
        title,
        content
    });
console.log(blogdata);
 let result = blogdata.save();
 return result;
}

async function getAllBlog()
{
    const allBlogs = await Blog.find({});
    return allBlogs;
};


async function getAllMyBlogs(userId)
{
    const myBlogs = await Blog.find({userId});
    return myBlogs;
}


async function getViewBLog( blogId )
{
    const requestedBlog = await Blog.find({_id:blogId});
    return requestedBlog;
}

async function getDeleteBlog(blogId)
{
    let result = await Blog.findOneAndDelete({_id:blogId});
    return result;
}

export {registerUser , getUserByUsername ,createBlog ,getAllBlog ,getAllMyBlogs , getViewBLog , getDeleteBlog};