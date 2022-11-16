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


/**
 * 
 * @param {Array of string card id} ids 
 */
const deleteMany = async (ids) => {
    try {
            console.log('hihihi')
        // need to convert ids to ObjectId first by mapping
        const transformIds = ids.map(i => ObjectId(i))
        console.log(transformIds)
        const result = await getDB().collection(cardCollectionName).update(
            {   _id: { $in: transformIds} },
            { $set: { _destroy: true}}
        )
console.log('hahahahaha')
        console.log(result)

        console.log('-----')
        return result
    } catch (error) {
        throw new Error(error)
    }
}


const update = async (id, data) => {
    try {

        const updateData = {
            ...data
        }

        if (data.boardId) {
            updateData.boardId = ObjectId(data.boardId)
        }
        if (data.columnId) {
            updateData.columnId = ObjectId(data.columnId)
        }

        const result = await getDB().collection(cardCollectionName).findOneAndUpdate(
            {_id:ObjectId(id) },
            {$set: updateData},
            {returnOriginal: false}
        )
       
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

export const CardModel = {cardCollectionName,createNew,
    deleteMany,update} 