import {Router} from 'express'
import { createArticle, deleteArticle, getArticleBySlug } from '../controllers/article'
import { getUserByEmail } from '../controllers/users'
import { Article } from '../entities/Article'
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
    try{
        const article = await getArticleBySlug(req.params.slug)
        res.status(200).json({article})
    }catch(e:any){
        res.status(422).json({errors:{body:['Could not find article', e.message]}})
    }
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

//PATCH /api/article:slug          Update an article
router.patch('/:slug', async(req, res)=>{
    try{
        const article:Article = await getArticleBySlug(req.params.slug)
        res.status(200).send({article})
    }catch(e:any){
        res.status(422).json({errors:{body:['Could not find article', e.message]}})
    }
})

//DELETE /api/articles:slug         Delete an article
router.delete('/:slug', async(req, res)=>{
    try{
        const deleted = await deleteArticle(req.params.slug)
        res.status(200).send(true)
    }catch(e:any){
        res.status(422).json({errors:{body:['Could not delete article', e.message]}})
    }
})
export const articlesRoute = router