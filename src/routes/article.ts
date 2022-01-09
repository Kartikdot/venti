import {Router} from 'express'

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
router.post('/', async(req, res)=>{

})

//PATCH /api/article          Updare an article
router.patch('/', async(req, res)=>{

})

export const articlesRoute = router