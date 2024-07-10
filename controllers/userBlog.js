async function blogPage(req, res) {
    res.render('blog');
};

async function blogLogout(req, res) {

    
    res.cookie('userId', '', { maxAge: 1 }).redirect('/');

}

export { blogPage, blogLogout }