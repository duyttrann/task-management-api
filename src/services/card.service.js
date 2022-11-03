import { CardModel } from "../models/card.model"
import { HttpStatusCode } from "../utilities/constants"


const createNew = async (data) => {
    try {
        const result = await CardModel.createNew(data)
        return result
        console.log(data)
       
    } catch (error) {
        throw new Error(error)
        
    }
}

export const CardService = {createNew} 