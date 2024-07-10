import bcrypt from 'bcrypt';

async function createHashPassword(password)
{
    const saltRound =10;
    const userPassword = password;
    const hasedPassword =await bcrypt.hash(userPassword , saltRound);
    return hasedPassword;
};


async function comparePassword(password , hashedPassword)
{
    const loginPassword = password;
    const hashedUserPassword = hashedPassword;
    const isMatch = await bcrypt.compare(loginPassword ,hashedUserPassword);
    return isMatch;
};



export {createHashPassword ,comparePassword };