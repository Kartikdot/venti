import {Router} from 'express'
import { createUser, loginUser } from '../controllers/users'

const router = Router()

//POST /api/users/login          Login user
router.post('/login', async(req, res)=>{

    try{
        const user = await loginUser(req.body.user)
        res.status(200).json({user}) 
    }catch(e:any){
        res.status(422).json({errors:{body:['Login failed', e.message]}})
    }
})

//POST /api/users                Register new user
router.post('/', async(req, res)=>{
    try{
        const user = await createUser(req.body.user);
        res.status(201).json({user})
    }catch(e:any){
        console.log(e)
        res.status(422).json({errors:{body:['Could not create user', e.message]}})
    }
})

export const usersRoute = router