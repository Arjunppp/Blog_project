import { registerUser ,getUserByUsername } from "../services/userServices.js";
import { comparePassword } from "../utils/bcryptUtil.js";
import { generateToken } from "../utils/jwtUtils.js";

async function handleRootPage(req, res) {
    res.render('home');
};

async function handleRegisterGet(req, res) {
    res.render('signUp');
}

async function handleRegisterPost(req, res) {
    try {
        const userData = req.body;
        const result = await registerUser(userData);
        res.render('home' ,{message :"User Created , Please Login"});
        }
    catch (err) {
        console.log(err);
    }

}

async function handleLogin(req , res)
{
     const {username , password} = req.body;
     let user = await getUserByUsername(username);
     if(!user)
     {
       
        res.render('home', {message:"Employee Not found"}); //redirect with message user not found
     }
     else{
        
         let result = await comparePassword(password , user.password)
         if(result)
         {
            let token =  generateToken(user);
            res.cookie('userId' ,token).redirect('/blog');
            
         }
         else{
            res.render('home' ,{message :"Incorrect Password"}); //password Mismatch -message to be given

         }
     }


}


export { handleRootPage, handleRegisterGet, handleRegisterPost ,handleLogin }