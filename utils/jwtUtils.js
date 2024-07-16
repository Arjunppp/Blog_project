import jwt from 'jsonwebtoken';
import 'dotenv/config';


const secretKey = process.env.SECRET_KEY ;



function generateToken(data)
{   try
    {
        const payload = data.toObject();
    let token =  jwt.sign(payload , secretKey);
    return token;

    }
    catch(err)
    {
        console.log(err);
    }

};

function verifyUser(token)
{
    try{
        let isMatch =  jwt.verify(token ,secretKey);
    return isMatch;
    }
    catch(err)
    {
        console.log(err);
    }
};


export {generateToken , verifyUser};