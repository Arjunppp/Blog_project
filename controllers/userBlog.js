import { createBlog, getAllBlog, getAllMyBlogs, getViewBLog, getDeleteBlog, getUpdatedBlog } from "../services/userServices.js";

async function blogPage(req, res) {
    try {
        let allBlog = await getAllBlog();
        const UserId = req.user._id;
        res.render('blog', { allBlog, UserId });
    }
    catch (err) {
        console.log(err);
    }
};

async function blogLogout(req, res) {
    try {
        res.cookie('userId', '', { maxAge: 1 }).redirect('/');
    }
    catch (err) {
        console.log(err);
    }

}

async function blogGetCreate(req, res) {
    try {
        res.render('createBLog');
    }
    catch (err) {
        console.log(err);
    }
}


async function blogSave(req, res) {

    try {
        if (req.body.title == '' || req.body.content == '') {
            res.render('createBlog', { message: "Title and content is mandatory" });
        }
        else {
            const userId = req.user._id;
            const { title, content } = req.body;

            let result = await createBlog(userId, title, content);
            if (!result) {
                res.redirect('/blog/post');
            }
            else {
                res.redirect('/blog');
            }

        }
    }
    catch (err) {
        console.log(err);
    }

}


async function handleGetAllMyBlogs(req, res) {
    try {
        if (req.params.id) {
            const userId = req.params.id;
            const myBlogs = await getAllMyBlogs(userId);
            if (!myBlogs || myBlogs.length == 0) {
                res.render('myBlog', { message: "You have no Blogs to view" });
            }
            else {
                res.render('myBlog', { myBlogs });
            }

        }
        else {
            const userId = req.user._id;
            const myBlogs = await getAllMyBlogs(userId);
            if (!myBlogs || myBlogs.length == 0) {
                res.render('myBlog', { message: "You have no Blogs to view" });
            }
            else {
                res.render('myBlog', { myBlogs });
            }
        }

    }
    catch (err) {
        console.log(err);
    }

};




async function handleDeleteBlog(req, res) {
    try {
        const blogId = (req.params.id);

        await getDeleteBlog(blogId);
        if (req.user.role == 'USER') {
            res.redirect('/blog');
        }
        else {
            res.redirect('/admin/blog')
        }
    }
    catch (err) {
        console.log(err);
    }
};



async function handleViewBlog(req, res) {
    try {
        const blogId = (req.params.id);
        const userId = req.user._id;
        const BlogData = await getViewBLog(blogId);


        res.render('viewMyBLog', { BlogData })
    }
    catch (err) {
        console.log(err);
    }



};


async function handleUpdateBlog(req, res) {
    try {
        const updatedData = req.body;
        let result = await getUpdatedBlog(updatedData);

        if (req.user.role == 'USER') {
            res.redirect('/blog');
        }
        else {
            res.redirect('/admin/blog')
        }
    }
    catch (err) {
        console.log(err);
    }
}


export { blogPage, blogLogout, blogGetCreate, blogSave, handleGetAllMyBlogs, handleDeleteBlog, handleViewBlog, handleUpdateBlog }