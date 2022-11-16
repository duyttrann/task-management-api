import { ColumnModel } from "../models/column.model"
import { BoardModel } from "../models/board.model"
import { CardModel } from "../models/card.model"
import { HttpStatusCode } from "../utilities/constants"


const createNew = async (data) => {
    try {
        const newColumn = await ColumnModel.createNew(data)
        newColumn.cards = []
        //update column order array in board
        // console.log(typeof newColumn.boardId)
        // console.log(typeof newColumn.boardId.toString())

        

        const boardId = newColumn.boardId.toString()
        const newColumnId = newColumn._id.toString()
        const updatedBoard = await BoardModel.pushColumnOrder(boardId, newColumnId)

        return newColumn
       
    } catch (error) {
        throw new Error(error)
        
    }
}



const update = async (id, data) => {
    try {

        const updateData = {
            ...data,
            updatedAt: Date.now()
        }

        if(updateData._id) delete updateData._id
        if(updateData.cards) delete updateData.cards

        const updatedColumn = await ColumnModel.update(id, updateData)
        
      
        //remove case
        if (updatedColumn._destroy) {
            console.log('-----------------------')
            //delete cards on its column
            CardModel.deleteMany(updatedColumn.CardOrder)
    
        }

        return updatedColumn
       
    } catch (error) {
        throw new Error(error)
        
    }
}

export const ColumnService = {createNew, update} 