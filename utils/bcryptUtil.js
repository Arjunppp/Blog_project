import bcrypt from 'bcrypt';

async function createHashPassword(password)
{
   try
   {
    const saltRound =10;
    const userPassword = password;
    const hasedPassword =await bcrypt.hash(userPassword , saltRound);
    return hasedPassword;
   }
   catch(err)
   {
    console.log(err);
   }
};


async function comparePassword(password , hashedPassword)
{
   try
   {
    const loginPassword = password;
    const hashedUserPassword = hashedPassword;
    const isMatch = await bcrypt.compare(loginPassword ,hashedUserPassword);
    return isMatch;
   }
   catch(err)
   {
    console.log(err);
   }
};



export {createHashPassword ,comparePassword };