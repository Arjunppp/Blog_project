import { User , Blog } from "../models/userModel.js";



export async function getAllUsers()
{
    
    let allUsers = await User.find({role:"USER"});
    return allUsers;
}


export async function updateUser(userId, username ,email , password)
{
    const updatedUser = await User.findByIdAndUpdate(userId, {
        username: username,
        email: email,
        password: password
    }, { new: true });

    return updatedUser
};


export async function getDeleteUser(userid)
{
  let result = await User.findByIdAndDelete({_id:userid});
  return result;
}