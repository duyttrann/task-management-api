import Joi, { date } from "joi";
import { ObjectID } from "mongodb";
import { getDB } from "../confiq/mongoDB";

//define Column collection
const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().required().min(3).max(20),
    CardOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)

})

const validateSchema = async (data) => {
    return await columnCollectionSchema.validateAsync(data, {abortEarly:false})
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB().collection(columnCollectionName).insertOne(value)
       
        const result2 = await getDB().collection(columnCollectionName).findOne(result.insertedId)
        
        return result2
        // return result.ops[0]
    } catch (error) {
        throw new Error(error)
    }
}


const update = async (id, data) => {
    try {
        const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
            {_id:ObjectID(id) },
            {$set: data},
            {returnOriginal: false}
        )
       
        console.log(result)
        return result.value
        // return result.ops[0]
    } catch (error) {
        throw new Error(error)
    }
}

export const ColumnModel = {createNew, update} 