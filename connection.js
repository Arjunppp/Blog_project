import mongoose from "mongoose";


async function dbConnection(url)
{
   try{
    const connectionUrl = url;
    await mongoose.connect(connectionUrl);
    console.log('DataBase connected sucessfully');
   }
   catch(err)
   {
    console.log(err);
   }
};


export {dbConnection};