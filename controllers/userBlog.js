import { createBlog ,getAllBlog } from "../services/userServices.js";

async function blogPage(req, res) {
    let allBlog = await getAllBlog();
    console.log(allBlog);
    res.render('blog', {allBlog});
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
export { blogPage, blogLogout ,blogGetCreate  ,blogSave}