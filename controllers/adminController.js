import { getUserByUsername } from "../services/userServices.js";
import { comparePassword } from "../utils/bcryptUtil.js";
import { generateToken } from "../utils/jwtUtils.js";

async function handleAdmin(req ,res)
{
    res.status(200).render('adminLogin');

}

async function handleAdminLogin(req ,res)
{
   try
   {
    const userData = req.body;
  
    const user = await getUserByUsername(userData.username);
    if(!user || user.role != 'ADMIN')
        {
           res.status(409).render('adminLogin' , {message:"Admin not found"}); 
        }
        else{
          
            let result = await comparePassword(userData.password , user.password)
            if(result)
            {
               let token =  generateToken(user);
               res.status(200).cookie('AdminId' ,token).redirect('/admin/blog');
               
            }
            else{
               res.status(401).render('adminLogin' ,{message:"Incorrect Password"}); //password Mismatch -message to be given
   
            }
        }
   }
   catch(err)
   {
    console.log(err);
   }

}

export {handleAdmin ,handleAdminLogin}