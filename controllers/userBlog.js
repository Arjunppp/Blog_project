async function blogPage(req, res) {
    res.render('blog');
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
    console.log(req.user._id , req.body.title , req.body.content );
    if(req.body.title == '' || req.body.content == '')
    {
        res.render('createBlog' , {message:"Title and content is mandatory"});
    }
    else{
        res.send('hai');
    }

}
export { blogPage, blogLogout ,blogGetCreate  ,blogSave}