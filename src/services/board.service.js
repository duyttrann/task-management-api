import { BoardModel } from "../models/board.model"
import { HttpStatusCode } from "../utilities/constants"
import { cloneDeep } from "lodash"

const createNew = async (data) => {
    try {
        const result = await BoardModel.createNew(data)
        return result
        console.log(data)
       
    } catch (error) {
        throw new Error(error)
        
    }
}


const getFullBoard = async (boardId) => {
    try {
        const board = await BoardModel.getFullBoard(boardId)
        console.log(board)

        if(!board || !board.columns){
            throw new Error('Board not found')
        }

        const transformBoard = cloneDeep(board)
        //filter deleted column
        transformBoard.columns = transformBoard.columns.filter(column => !column._destroy)


        //add card to each column (under)
        transformBoard.columns.forEach(column => {
            column.cards = transformBoard.cards.filter(c => c.columnId.toString() === column._id.toString())
        })


        //sort columns by ColumnOrder, sort cards by cardOrder, 

        //remove cards from outside columns
        delete transformBoard.cards
        
        return transformBoard
      
    } catch (error) {
        throw new Error(error)
        
    }
}


export const BoardService = {createNew, getFullBoard} 