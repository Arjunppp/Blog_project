import { getAllUsers , updateUser , getDeleteUser } from "../services/adminServices.js";
import { getAllMyBlogs } from "../services/userServices.js";


async function handleAdminMainPage(req, res) {
    try
    {
        const result = await getAllUsers();
    res.render('adminBlog', { result });
    }
    catch(err)
    {
        console.log(err);
    }
};

async function handleAdminLogOut(req, res) {
    
  try
  {
    res.cookie('AdminId', '', { maxAge: 1 }).redirect('/admin');
  }
  catch(err)
  {
    console.log(err);
  }
}


async function handleGetAllUserPost(req, res) {
   try
   {
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
   catch(err)
   {
    console.log(err);
   }

}


async function handlegetTheUser(req, res) {
  try{
    const userId = req.params.id;
    let users = await getAllUsers();
    const requiredUser = users.filter((each) => {
        return each._id == userId;
    });
    console.log(requiredUser);
    res.render('adminViewUser' ,{requiredUser});
  }
  catch(err)
  {
    console.log(err);
  }
}


async function handleUpdateUser(req ,res)
{
    try{
        const userId = req.params.id;
    const {username , email } = req.body;
    console.log(userId, username ,email );
    let result = await updateUser(userId, username ,email );
    res.send('OK');
    }
    catch(err)
    {
        console.log(err);
    }
    
};




 export async function handleDeleteUser(req, res)
{
   try
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
   catch(err)
   {
    console.log(err);
   }
}




export { handleAdminMainPage, handleAdminLogOut, handleGetAllUserPost, handlegetTheUser ,handleUpdateUser };