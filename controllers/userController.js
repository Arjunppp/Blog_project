import { registerUser, getUserByUsername } from "../services/userServices.js";
import { comparePassword } from "../utils/bcryptUtil.js";
import { generateToken } from "../utils/jwtUtils.js";

async function handleRootPage(req, res) {
  try {
    res.status(200).render('home'); // res.render('signUp');
  }
  catch (error) {
    console.error(error);
  }
};

async function handleRegisterGet(req, res) {
  try {
    res.status(200).render('signUp');
  }
  catch (error) {
    console.error(error);
  }
}

async function handleRegisterPost(req, res) {
  try {
    const userData = req.body;
    let result = await registerUser(userData);
    if (result.hasOwnProperty('message')) {
      res.render('home', { message: "User Created , Please Login" });
    }
    if (result.hasOwnProperty('Error')) {

      res.render('signUp', { message: `${Object.keys(result.Error.keyValue)[0]} already exists` });
    }


  }
  catch (err) {
    console.log(err);
  }

}

async function handleLogin(req, res) {
  try {
    const { username, password } = req.body;
    let user = await getUserByUsername(username);
    if (!user) {

      res.render('home', { message: "Employee Not found" }); //redirect with message user not found
    }
    else {

      let result = await comparePassword(password, user.password)
      if (result) {
        let token = generateToken(user);
        res.cookie('userId', token).redirect('/blog');

      }
      else {
        res.render('home', { message: "Incorrect Password" }); //password Mismatch -message to be given

      }
    }
  }
  catch (err) {
    console.log(err);
  }


}


export { handleRootPage, handleRegisterGet, handleRegisterPost, handleLogin }