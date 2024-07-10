//create an user authorisation middleware
//if token exxit
    //then check user has an role of USer
    //if only give next and go to that contoller
    //else redirect to login page

import { verifyUser } from "../utils/jwtUtils.js";




async function userAuth(req ,res ,next)
{
    console.log('Hello');
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