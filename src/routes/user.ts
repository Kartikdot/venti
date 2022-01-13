import {Router} from 'express'
import { tokenAuth } from '../middleware/authorization'

const router = Router()

//GET /api/user         Get current user
router.get('/', tokenAuth, (req, res)=>{

})

//PATCH /api/user        Update current user
router.patch('/', (req, res)=>{

})

export const userRoute = router