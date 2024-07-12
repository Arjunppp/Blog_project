import { getAllUsers } from "../services/adminServices.js";
import { getAllMyBlogs } from "../services/userServices.js";


async function handleAdminMainPage(req, res) {
    const result = await getAllUsers();
    res.render('adminBlog', { result });
};

async function handleAdminLogOut(req, res) {
    console.log('Hello');
    res.cookie('AdminId', '', { maxAge: 1 }).redirect('/admin');
}


async function handleGetAllUserPost(req, res) {
    const userId = req.params.id;
    const allBlogs = await getAllMyBlogs(userId);
    if (allBlogs.length == 0) {
        let message = "No blogs to view";
        res.render('adminViewAll', { message });
    }
    else {
        res.render('adminViewAll', { allBlogs });
    }

}


async function handlegetTheUser(req, res) {
    const userId = req.params.id;
    let users = await getAllUsers();
    const requiredUser = users.filter((each) => {
        return each._id == userId;
    });
    console.log(requiredUser);
    res.render('adminViewUser' ,{requiredUser});
}

export { handleAdminMainPage, handleAdminLogOut, handleGetAllUserPost, handlegetTheUser };