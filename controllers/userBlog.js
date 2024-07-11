import { createBlog ,getAllBlog ,getAllMyBlogs } from "../services/userServices.js";

async function blogPage(req, res) {
    let allBlog = await getAllBlog();
    const UserId = req.user._id;
    res.render('blog', {allBlog ,UserId});
};

async function blogLogout(req, res) {

    
    res.cookie('userId', '', { maxAge: 1 }).redirect('/');

}

async function blogGetCreate(req , res)
{
    res.render('createBLog');
}


async function blogSave(req , res)
{
    
    if(req.body.title == '' || req.body.content == '')
    {
        res.render('createBlog' , {message:"Title and content is mandatory"});
    }
    else{
      const userId = req.user._id;
      const {title , content} = req.body;
     
    let result = await createBlog(userId , title ,content);
    if(!result)
    {
        res.redirect('/blog/post');
    }
    else{
       res.redirect('/blog');
    }
    
    }

}


async function handleGetAllMyBlogs(req ,res)
{
    const userId = req.user._id;
    const myBlogs = await getAllMyBlogs(userId);
    if(!myBlogs)
    {
        res.render('myBlog' ,{message:"You have no Blogs to view"});
    }
    else{
        res.render('myBlog', {myBlogs});
    }

    //create a service to get all the post from BLogs where user id is this
}
export { blogPage, blogLogout ,blogGetCreate  ,blogSave ,handleGetAllMyBlogs}