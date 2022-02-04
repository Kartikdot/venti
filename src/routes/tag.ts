import {Router} from 'express'
import { getTags } from '../controllers/tags'

const router = Router()

router.get('/', async (req, res)=>{
    try{
        const tags = await getTags()
        res.status(200).json({tags:tags})
    }catch(e :any){
        res.status(422).json({errors:{body:['Could not fetch tags', e.message]}})
    }
})

export const tagsRoute = router