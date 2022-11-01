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

export const BoardService = {createNew} 