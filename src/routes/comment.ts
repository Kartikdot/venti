import { Router } from "express";
import { createComment, getCommentsForArticle } from "../controllers/comments";
import { tokenAuth } from "../middleware/authorization";

const router = Router()

//GET   /api/articles/{slug}/comments          Get Comments
router.get('/:slug/comments',  async (req, res)=>{
    try{
        const comments = await getCommentsForArticle(req.params.slug)
        res.status(200).json({comments})
    }catch(e:any){
        res.status(422).json({errors:{body:['Could not fetch comments', e.message]}})
    }
})

//POST   /api/articles/{slug}/comments         Create Comment
router.post('/:slug/comments', tokenAuth, async(req, res)=>{
    try{
        const comment = await createComment(req.params.slug, req.body.comment.body, (req as any).user.email)
        res.status(200).json({comment})
    }catch(e:any){
        res.status(422).json({errors:{body:['Could not create comment', e.message]}})
    }
})

//DELETE /api/articles/{slug}/comments/{id}
router.delete('/:slug/comments/:id', tokenAuth, )
export const commentsRoute = router