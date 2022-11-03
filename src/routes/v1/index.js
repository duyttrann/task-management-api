import express from 'express'
import { HttpStatusCode } from '../../utilities/constants'
import { boardRoutes } from './board.route'
import { columnRoutes } from './column.route'
import { cardRoutes } from './card.route'

const router = express.Router()

/**
 * GET v1/status
 * 
 */

 router.get('/status', (req,res) => res.status(HttpStatusCode.OK).json({ status: 'OK'}) )

 /**
  * BOard Api
  */
router.use('/boards', boardRoutes)

 /**
  * Column Api
  */
  router.use('/columns', columnRoutes)

 /**
  * Card Api
  */
  router.use('/cards', cardRoutes)
 export const apiV1 = router