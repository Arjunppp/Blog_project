import { User , Blog } from "../models/userModel.js";
import { createHashPassword } from "../utils/bcryptUtil.js";



export async function getAllUsers()
{
   try
   {
     
    let allUsers = await User.find({role:"USER"});
    return allUsers;
   }
   catch(err)
   {
    console.log(err);
   }
}


export async function updateUser(userId, username ,email )
{
    // let bcryptPass = await createHashPassword(password);
    try
    {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            username: username,
            email: email
        }, { new: true });
    
        return updatedUser
    }
    catch(err)
    {
        console.log(err);

    }
};


export async function getDeleteUser(userid)
{
 try
 {
    let result = await User.findByIdAndDelete({_id:userid});
    let deletallblogs = await getDeleteAllPostOfAUser(userid);
     return result;
 }
 catch(err)
 {
    console.log(err);
 }
};



async function getDeleteAllPostOfAUser(userid)
{
   try
   {
    let  result = await Blog.deleteMany({userId:userid});
    return result;
   }
   catch(err)
   {
    console.log(err);
   }
}