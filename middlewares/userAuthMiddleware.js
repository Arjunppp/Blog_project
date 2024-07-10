import { verifyUser } from "../utils/jwtUtils.js";


async function userAuth(req ,res ,next)
{
    
    let token =  req.cookies?.userId;
 
    if(!token)
    {
       return  res.redirect('/');
    };
    let userData = verifyUser(token);
    if(userData.role =='USER')
    { 
        req.user = userData;
        next();
    }
    else{
        res.redirect('/');
    }
   
}



export {userAuth};