import { ColumnService } from "../services/column.service"
import { HttpStatusCode } from "../utilities/constants"

const createNew =   async (req,res)=>{
    // console.log(req.body)
    try {
        const result = await ColumnService.createNew(req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }

} 



const update =   async (req,res)=>{
    // console.log(req.body)
    try {

  //      const { id} = req.params.id
        const { id} = req.params
        const result = await ColumnService.update(id, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }

} 

export const ColumnController = {createNew, update}