import Joi, { date } from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "../confiq/mongoDB";

//define card collection
const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(3).max(30).trim(),
    cover: Joi.string().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)

})

const validateSchema = async (data) => {
    return await cardCollectionSchema.validateAsync(data, {abortEarly:false})
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        console.log(value)
        const insertValue = {
            ...value,
            boardId: ObjectId(value.boardId),
            columnId: ObjectId(value.columnId)
        }
        const result = await getDB().collection(cardCollectionName).insertOne(insertValue)
       
        const result2 = await getDB().collection(cardCollectionName).findOne(result.insertedId)
        
        return result2
        // return result.ops[0]
    } catch (error) {
        throw new Error(error)
    }
}

export const CardModel = {cardCollectionName,createNew} 