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
}
export {registerUser , getUserByUsername ,createBlog ,getAllBlog};