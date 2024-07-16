import { getAllUsers , updateUser , getDeleteUser } from "../services/adminServices.js";
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


async function handleUpdateUser(req ,res)
{
    const userId = req.params.id;
    const {username , email } = req.body;
    console.log(userId, username ,email );
    let result = await updateUser(userId, username ,email );
    res.send('OK');
    
};




 export async function handleDeleteUser(req, res)
{
    const userId = req.params.id;
    let result = await getDeleteUser(userId);
    if(result.length == 0)
    {
        res.send('Sucess');
    }
    else
    {
        res.send('failed');
    }
}


export async function handleGetUserBlog(req , res)
{
    console.log(req);
}

export { handleAdminMainPage, handleAdminLogOut, handleGetAllUserPost, handlegetTheUser ,handleUpdateUser };