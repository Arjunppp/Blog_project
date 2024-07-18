import { getAllUsers , updateUser , getDeleteUser } from "../services/adminServices.js";
import { getAllMyBlogs } from "../services/userServices.js";


export async function handleAdminMainPage(req, res ,next) {
    try
    {
        const result = await getAllUsers();
    res.render('adminBlog', { result });
    }
    catch(err)
    {
       next(err);
    }
};

export async function handleAdminLogOut(req, res ,next) {
    
  try
  {
    res.cookie('AdminId', '', { maxAge: 1 }).redirect('/admin');
  }
  catch(err)
  {
    next(err);
  }
}


export async function handleGetAllUserPost(req, res ,next) {
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
    next(err);
   }

}


export async function handlegetTheUser(req, res ,next) {
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
    next(err);
  }
}


export async function handleUpdateUser(req ,res ,next)
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
       next(err);
    }
    
};




 export async function handleDeleteUser(req, res,next)
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
    next(err);
   }
}



