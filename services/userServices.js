import { User, Blog } from "../models/userModel.js";
import { createHashPassword } from "../utils/bcryptUtil.js";



export async function registerUser(data) {
    try {
        let { username, email, password } = data;
        password = await createHashPassword(password);
        const user = new User({
            username,
            password,
            email
        });
        await user.save();
        return { message: "Sucess" };

    }
    catch (err) {
        return { Error: { code: err.code, keyValue: err.keyValue } };
    }


};

export async function getUserByUsername(name) {
    try {
        let user = await User.findOne({ username: name });
        return user;
    }
    catch (Err) {
     throw Err;
    }

};


export async function createBlog(userId, title, content) {
    try {
        let blogdata = new Blog({
            userId,
            title,
            content
        });
        console.log(blogdata);
        let result = blogdata.save();
        return result;
    }
    catch(Err)
    {
        throw Err;
    }
}

export async function getAllBlog() {
    try{
        const allBlogs = await Blog.find({});
    return allBlogs;
    }
    catch(err)
    {
       throw err;
    }
};


export async function getAllMyBlogs(userId) {
   try
   {
    const myBlogs = await Blog.find({ userId });
    return myBlogs;
   }
   catch(err)
   {
    throw err;
   }
}


export async function getViewBLog(blogId) {
   try{
    const requestedBlog = await Blog.find({ _id: blogId });
    return requestedBlog;
   }
   catch(err)
   {
   throw err;
   }
}

export async function getDeleteBlog(blogId) {
   try
   {
    let result = await Blog.findOneAndDelete({ _id: blogId });
    return result;
   }
   catch(err)
   {
   throw err;
   }
}

export async function getUpdatedBlog(data) {
  try
  {
    const { blogId, title, content } = data;
    const updateFields = { title, content };
    const result = await Blog.findByIdAndUpdate(
        blogId,
        { $set: updateFields },
        { new: true, runValidators: true }
    );

  }
  catch(err)
  {
    throw err;
  }

}

