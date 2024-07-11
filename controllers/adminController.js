import { getUserByUsername } from "../services/userServices.js";
import { comparePassword } from "../utils/bcryptUtil.js";
import { generateToken } from "../utils/jwtUtils.js";

async function handleAdmin(req ,res)
{
    res.render('adminLogin');

}

async function handleAdminLogin(req ,res)
{
    const userData = req.body;
  
    const user = await getUserByUsername(userData.username);
    if(!user || user.role != 'ADMIN')
        {
           res.render('adminLogin' , {message:"Admin not found"}); 
        }
        else{
          
            let result = await comparePassword(userData.password , user.password)
            if(result)
            {
               let token =  generateToken(user);
               res.cookie('AdminId' ,token).redirect('/admin/blog');
               
            }
            else{
               res.render('adminLogin' ,{message:"Incorrect Password"}); //password Mismatch -message to be given
   
            }
        }

}

export {handleAdmin ,handleAdminLogin}