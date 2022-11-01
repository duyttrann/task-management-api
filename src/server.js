import express from 'express'

import { connectDB, getDB } from './confiq/mongoDB.js'
import { env } from './confiq/environment.js'
import { apiV1 } from './routes/v1/index.js'
import {BoardModel} from './models/board.model.js' 


connectDB()
    .then(()=>console.log('Success'))
    .then(() =>bootServer())
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
const bootServer = () => {
    const app = express()

    //Enable req.body data
    app.use(express.json())


    //use apis v1
    app.use('/v1',apiV1)
   /**
    * Test sending request
    *  app.get('/test',async (req, res) => {
        // const dbInstance = getDB()
        // await dbInstance.collection('boards').insertOne({
        //     title:'testname'
        // })

        let fakeData = {
            title: 'test Titlte'
        }

        const newBoard =  await BoardModel.createNew(fakeData)
        console.log(newBoard)
        res.end('<h1>dcdcd</h1>')
    }) */
    
    app.listen(env.APP_PORT,env.APP_HOST, () => {
        console.log(`Running at ${env.APP_HOST}:${env.APP_PORT}/`)
        
    })
}