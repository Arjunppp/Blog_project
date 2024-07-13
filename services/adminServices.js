import { User , Blog } from "../models/userModel.js";
import { createHashPassword } from "../utils/bcryptUtil.js";



export async function getAllUsers()
{
    
    let allUsers = await User.find({role:"USER"});
    return allUsers;
}


export async function updateUser(userId, username ,email , password)
{
    let bcryptPass = await createHashPassword(password);
    const updatedUser = await User.findByIdAndUpdate(userId, {
        username: username,
        email: email,
        password: bcryptPass
    }, { new: true });

    return updatedUser
};


export async function getDeleteUser(userid)
{
  let result = await User.findByIdAndDelete({_id:userid});
 let deletallblogs = await getDeleteAllPostOfAUser(userid);
  return result;
};



async function getDeleteAllPostOfAUser(userid)
{
   let  result = await Blog.deleteMany({userId:userid});
    return result
    ;
}