import { ColumnModel } from "../models/column.model"
import { BoardModel } from "../models/board.model"
import { HttpStatusCode } from "../utilities/constants"


const createNew = async (data) => {
    try {
        const newColumn = await ColumnModel.createNew(data)
       
        //update column order array in board
        console.log(typeof newColumn.boardId)
        console.log(typeof newColumn.boardId.toString())

        const boardId = newColumn.boardId.toString()
        const newColumnId = newColumn._id.toString()
        const updatedBoard = await BoardModel.pushColumnOrder(boardId, newColumnId)
       console.log(updatedBoard)
        return newColumn
       
    } catch (error) {
        throw new Error(error)
        
    }
}



const update = async (id, data) => {
    try {

        const updateData = {
            ...data,
            updateAt: Date.now()
        }
        const result = await ColumnModel.update(id, data)
        return result
       
    } catch (error) {
        throw new Error(error)
        
    }
}

export const ColumnService = {createNew, update} 