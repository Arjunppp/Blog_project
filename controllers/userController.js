import { registerUser, getUserByUsername } from "../services/userServices.js";
import { comparePassword } from "../utils/bcryptUtil.js";
import { generateToken } from "../utils/jwtUtils.js";

export async function handleRootPage(req, res ,next) {
  try {
    res.status(200).render('home'); // res.render('signUp');
  }
  catch (error) {
    next(error);
  }
};

export async function handleRegisterGet(req, res ,next) {
  try {
    res.status(200).render('signUp');
  }
  catch (error) {
    next(error);
  }
}

export async function handleRegisterPost(req, res, next) {
  try {
    const userData = req.body;
    let result = await registerUser(userData);
    if (result.hasOwnProperty('message')) {
      res.status(200).render('home', { message: "User Created , Please Login" });
    }
    if (result.hasOwnProperty('Error')) {

      res.status(409).render('signUp', { message: `${Object.keys(result.Error.keyValue)[0]} already exists` });
    }


  }
  catch (err) {
   next(err)
  }

}

export async function handleLogin(req, res, next) {
  try {
    const { username, password } = req.body;
    let user = await getUserByUsername(username);
    if (!user) {

      res.status(404).render('home', { message: "Employee Not found" }); //redirect with message user not found
    }
    else {

      let result = await comparePassword(password, user.password)
      if (result) {
        let token = generateToken(user);
        res.status(200).cookie('userId', token).redirect('/blog');

      }
      else {
        res.status(401).render('home', { message: "Incorrect Password" }); //password Mismatch -message to be given

      }
    }
  }
  catch (err) {
   next(err);
  }


}


