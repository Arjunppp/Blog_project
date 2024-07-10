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
    if(!user)
        {
           res.redirect('/'); //redirect with message user not found
        }
        else{
           /*
           1. comapre the old password and the hashed password
           2.if match == true -- user is authenticated
               2.1 if authenticated -- create an jwt token
               2.2 render the blog page and send cookie as resposne.
           3.if password is false
               3.2 redirect to home page '/'
               3.2 with password is wrong
   
             */
            let result = await comparePassword(userData.password , user.password)
            if(result)
            {
               let token =  generateToken(user);
               res.cookie('AdminId' ,token).redirect('/admin/blog');
               
            }
            else{
               res.redirect('/'); //password Mismatch -message to be given
   
            }
        }

}

export {handleAdmin ,handleAdminLogin}