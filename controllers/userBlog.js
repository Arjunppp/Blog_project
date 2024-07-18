import { createBlog, getAllBlog, getAllMyBlogs, getViewBLog, getDeleteBlog, getUpdatedBlog } from "../services/userServices.js";

export async function blogPage(req, res ,next) {
    try {
        let allBlog = await getAllBlog();
        const UserId = req.user._id;
        res.render('blog', { allBlog, UserId });
    }
    catch (err) {
           next(err);
    }
};

export async function blogLogout(req, res ,next ) {
    try {
        res.cookie('userId', '', { maxAge: 1 }).redirect('/');
    }
    catch (err) {
        next(err)
    }

}

export async function blogGetCreate(req, res ,next) {
    try {
        res.render('createBLog');
    }
    catch (err) {
        next(err);
    }
}


export async function blogSave(req, res ,next) {

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
        next(err)
    }

}


export async function handleGetAllMyBlogs(req, res ,next) {
    try {
        console.log('hiiiii');
        if (req.params.id) {
            const userId = req.params.id;
            const myBlogs = await getAllMyBlogs(userId);
            if (!myBlogs || myBlogs.length == 0) {
                res.status(200).render('myBlog', { message: "You have no Blogs to view" });
            }
            else {
                res.status(200).render('myBlog', { myBlogs });
            }

        }
        else {
            const userId = req.user._id;
            const myBlogs = await getAllMyBlogs(userId);
            if (!myBlogs || myBlogs.length == 0) {
                res.status(200).render('myBlog', { message: "You have no Blogs to view" });
            }
            else {
                res.status(200).render('myBlog', { myBlogs });
            }
        }

    }
    catch (err) {
        next(err);
    }

};




export async function handleDeleteBlog(req, res, next) {
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
        next(err);
    }
};



export async function handleViewBlog(req, res ,next) {
    try {
        const blogId = (req.params.id);
        const userId = req.user._id;
        const BlogData = await getViewBLog(blogId);


        res.render('viewMyBLog', { BlogData })
    }
    catch (err) {
        next(err);
    }



};


export async function handleUpdateBlog(req, res ,next) {
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
        next(err);
    }
}


