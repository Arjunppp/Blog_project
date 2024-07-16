import { verifyUser } from "../utils/jwtUtils.js";


async function userAuth(req, res, next) {

    try {
        let token = req.cookies?.userId;

        if (!token) {
            return res.redirect('/');
        };
        let userData = verifyUser(token);
        if (userData.role == 'USER') {
            req.user = userData;
            next();
        }
        else {
            res.redirect('/');
        }
    }
    catch (err) {
        console.log(err);
    }

}



export { userAuth };