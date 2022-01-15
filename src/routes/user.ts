import {Router} from 'express'
import { getUserByEmail, updateUser } from '../controllers/users'
import { tokenAuth } from '../middleware/authorization'

const router = Router()

//GET /api/user         Get current user
router.get('/', tokenAuth, async (req, res)=>{
    try{
        const user = await getUserByEmail((req as any).user.email)
        res.status(200).json({user}) 
    }catch(e:any){
        res.status(422).json({errors:{body:['Get user Request failed', e.message]}})
    }
})

//PATCH /api/user        Update current user
router.patch('/', tokenAuth, async (req, res)=>{
    try{
        const user = await updateUser(req.body.user, (req as any).user.email)
        res.status(200).json({user}) 
    }catch(e:any){
        res.status(422).json({errors:{body:['Cannot update user details', e.message]}})
    }
})

export const userRoute = router