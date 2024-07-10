import { verifyUser } from "../utils/jwtUtils.js";




async function adminAuth(req ,res ,next)
{
   
    let token =  req.cookies?.AdminId;
 
    if(!token)
    {
       return  res.redirect('/admin');
    };
    let userData = verifyUser(token);
    if(userData.role =='ADMIN')
    { 
        req.user = userData;
        next();
    }
    else{
        res.redirect('/admin');
    }
   
}



export {adminAuth};