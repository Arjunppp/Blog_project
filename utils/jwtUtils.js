import jwt from 'jsonwebtoken';
import 'dotenv/config';


const secretKey = process.env.SECRET_KEY ;



async function generateToken(data)
{   const payload = data.toObject();
    let token =  jwt.sign(payload , secretKey);
    return token;


};

async function verifyUser(token)
{
    let isMatch =  jwt.verify(token ,secretKey);
    return isMatch;
};


export {generateToken , verifyUser};