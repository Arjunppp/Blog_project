import { registerUser } from "../services/userServices.js";

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
        res.redirect('/');
        }
    catch (err) {
        console.log(err);
    }

}



export { handleRootPage, handleRegisterGet, handleRegisterPost }