async function handleAdminMainPage(req ,res)
{
    res.render('adminBlog');
};

async function handleAdminLogOut(req ,res)
{
    console.log('Hello');
    res.cookie('AdminId', '', { maxAge: 1 }).redirect('/admin');
}

export {handleAdminMainPage , handleAdminLogOut};