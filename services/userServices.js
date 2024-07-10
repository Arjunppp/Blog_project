import { User } from "../models/userModel.js";



async function registerUser(data)
{
    try{
        let result = await User.create(data);
        return result;
    }
    catch(err)
    {
        console.log(err);
    }
    

};



export {registerUser};