import Joi, { date } from "joi";
import { ObjectId } from "mongodb";
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

const getColumnCollectionname = () =>{
    return columnCollectionName
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const insertValue = {
            ...value,
            boardId: ObjectId(value.boardId)
        }
        const result = await getDB().collection(columnCollectionName).insertOne(insertValue)
       
        const result2 = await getDB().collection(columnCollectionName).findOne(result.insertedId)
        
        return result2
        // return result.ops[0]
    } catch (error) {
        throw new Error(error)
    }
}


/**
 * 
 * @param {string} columnId 
 * @param {string} newCardId 
 */
 const pushCardOrder = async (columnId, newCardId)=>{
    try {
        const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
            {_id:ObjectId(columnId) },
            {$push: {CardOrder: newCardId}},
            {returnOriginal: false}
        )

        return result.value
      
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


        console.log('-----MODAL----')
        console.log(updateData)

        const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
            {_id:ObjectId(id) },
            {$set: updateData},
            {returnOriginal: false}
        )
       
        //delete case 
        const resultDeleteCase = await getDB().collection(columnCollectionName).findOne(result.insertedId)
        
        if(resultDeleteCase._destroy) {
            return resultDeleteCase
        }else{
            return result.value
        }
      

    } catch (error) {
        throw new Error(error)
    }
}

export const ColumnModel = {columnCollectionName ,createNew,pushCardOrder, update} 