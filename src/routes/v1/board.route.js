import express from 'express'
import { BoardController } from '../../controllers/board.controller'
import { BoardValidation } from '../../validations/board.validation'

const router = express.Router()

router.route('/')
    /**.get((req,res)=> console.log('get boards'))
    .post((req,res)=> console.log('post boards'))
 */
    .post(BoardValidation.createNew, BoardController.createNew)
export const boardRoutes = router