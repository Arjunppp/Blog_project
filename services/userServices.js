import { User, Blog } from "../models/userModel.js";
import { createHashPassword } from "../utils/bcryptUtil.js";



async function registerUser(data) {
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

async function getUserByUsername(name) {
    try {
        let user = await User.findOne({ username: name });
        return user;
    }
    catch (Err) {
        console.log(Err);
    }

};


async function createBlog(userId, title, content) {
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
        console.log(Err);
    }
}

async function getAllBlog() {
    try{
        const allBlogs = await Blog.find({});
    return allBlogs;
    }
    catch(err)
    {
        console.log(err);
    }
};


async function getAllMyBlogs(userId) {
   try
   {
    const myBlogs = await Blog.find({ userId });
    return myBlogs;
   }
   catch(err)
   {
    console.log(err);
   }
}


async function getViewBLog(blogId) {
   try{
    const requestedBlog = await Blog.find({ _id: blogId });
    return requestedBlog;
   }
   catch(err)
   {
    console.log(err);
   }
}

async function getDeleteBlog(blogId) {
   try
   {
    let result = await Blog.findOneAndDelete({ _id: blogId });
    return result;
   }
   catch(err)
   {
    console.log(err);
   }
}

async function getUpdatedBlog(data) {
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
    console.log(err);
  }

}

export { registerUser, getUserByUsername, createBlog, getAllBlog, getAllMyBlogs, getViewBLog, getDeleteBlog, getUpdatedBlog };