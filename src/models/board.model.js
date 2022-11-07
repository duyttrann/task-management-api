import { ObjectId } from "mongodb";
import Joi, { date } from "joi";
import { getDB } from "../confiq/mongoDB";
import {ColumnModel} from './column.model'
import { CardModel } from "./card.model";

//define board collection
const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(20).trim(),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)

})

const validateSchema = async (data) => {
    return await boardCollectionSchema.validateAsync(data, {abortEarly:false})
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB().collection(boardCollectionName).insertOne(value)
       
        const result2 = await getDB().collection(boardCollectionName).findOne(result.insertedId)
        
        return result2
        // return result.ops[0]
    } catch (error) {
        throw new Error(error)
    }
}

/**
 * 
 * @param {string} boardId 
 * @param {string} newColumnId 
 */
const pushColumnOrder = async (boardId, newColumnId)=>{
    try {
        const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
            {_id:ObjectId(boardId) },
            {$push: {columnOrder: newColumnId}},
            {returnOriginal: false}
        )

        return result.value
    } catch (error) {
        throw new Error(error)
    }
}


const getFullBoard = async (boardId) => {
    try { 

        // ObjectId = require('mongodb').ObjectId;
        // console.log(typeof(ObjectId("6361db094b6fbdfbdfbb153d58857d80")))
//         const {ObjectId} = require('mongodb');
// const id = new ObjectId('6361db094b6fbdfbdfbb153d58857d80')

        const result = await getDB().collection(boardCollectionName).aggregate([
            {
                $match: {
                    // _id: { $toObjectId: boardId }
                    _id: ObjectId(boardId)
                    // _id: id
                }
            },
        /** another way to pass the boardId as objectid   
         *  {
                $addFields: {
                    _idTest: {
                        $toString: '$_id'
                    }
                }
            },*/ 
            {
                $lookup: {
                        from: ColumnModel.columnCollectionName,
                        // localField: '_idTest',
                        localField: '_id',
                        foreignField : 'boardId',
                        as: 'columns'
                }    
            },
            {
                $lookup: {
                        from: CardModel.cardCollectionName,
                        // localField: '_idTest',
                        localField: '_id', //board id
                        foreignField : 'boardId',
                        as: 'cards'
                }    
            }
        ]).toArray()
      
        // return result
        return result[0] || {}

    } catch (error) {
        throw new Error(error)
    }
}

export const BoardModel = {createNew,
                        pushColumnOrder, 
                        getFullBoard} 