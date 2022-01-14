import {Router} from 'express'
import { createArticle } from '../controllers/article'
import { getUserByEmail } from '../controllers/users'
import { tokenAuth } from '../middleware/authorization'

const router = Router()

//GET /api/articles          List Articles
router.get('/', async(req, res)=>{
    console.log("route works")
})

//GET /api/articles/feed     List Articles from users one follows
router.get('/feed', async(req, res)=>{
    
})

//GET /api/articles/:slug     Get an article
router.get('/:slug', async(req, res)=>{
    
})

//POST /api/articles          Create an article
router.post('/', tokenAuth,async(req, res)=>{
    try{
        const article = await createArticle(req.body.article, (req as any).user.email)
        res.status(200).json({article})
    }catch(e:any){
        res.status(422).json({errors:{body:['Could not create article', e.message]}})
    }
})

//PATCH /api/article          Updare an article
router.patch('/', async(req, res)=>{

})

export const articlesRoute = router