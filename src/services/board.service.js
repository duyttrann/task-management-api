import { BoardModel } from "../models/board.model"
import { HttpStatusCode } from "../utilities/constants"


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
        
        //add card to each column (under)
        board.columns.forEach(column => {
            column.cards = board.cards.filter(c => c.columnId.toString() === column._id.toString())
        })

        //remove cards from outside columns
        delete board.cards
        
        return board
      
    } catch (error) {
        throw new Error(error)
        
    }
}


export const BoardService = {createNew, getFullBoard} 