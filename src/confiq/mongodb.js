import { MongoClient } from "mongodb"
import { env } from "./environment"


let dbInstance = null;
//1yi17S2Yr36SG91H

export const connectDB = async () =>{
    const client = new MongoClient(env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser :true
    })


    //connect to DB
    await client.connect()

    //assign clientDB to our dbinstance
    dbInstance = client.db(env.DATABASE_NAME)

    

}

//get DB instance
export const getDB = ()=>{
    if (!dbInstance) throw new Error('must connect to db')
    return dbInstance
}





// const listDatabases = async (client) => {
//     const databasesList = await client.db().admin().listDatabases()
//     console.log(databasesList)
//     databasesList.databases.forEach(db => 
//        console.log(`- ${db.name}`) 
//     );
// }