import { User , Blog } from "../models/userModel.js";



export async function getAllUsers()
{
    
    let allUsers = await User.find({role:"USER"});
    return allUsers;
}