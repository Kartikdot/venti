import { getRepository } from "typeorm";
import { Article } from "../entities/Article";
import { Comment } from "../entities/Comment";
import { User } from "../entities/User";
import { sanitizeUser } from "../utils/security";

export async function createComment(slug:string, body:string, email:string):Promise<Comment>{
    const userRepo = getRepository(User)
    const commentRepo = getRepository(Comment)
    const articleRepo = getRepository(Article)

    const user = await userRepo.findOne(email)
    if(!user) throw new Error('No user found')
    const article = await articleRepo.findOne(slug)
    if(!article) throw new Error('No article corresponding to slug found')
    
    try{
        const comment = await commentRepo.save(new Comment(slug, body, sanitizeUser(user)))
        return comment
    }catch(e){
        throw(e)
    }
}

export async function getCommentsForArticle(slug:string):Promise<Comment[]>{
    const repo = getRepository(Comment)

    try{
        const comments = await repo.find({where:{slug:slug}, relations:['author']})
        comments.forEach((comment)=>{
            comment.author = sanitizeUser(comment.author)
        })
        return comments
    }catch(e){
        throw(e)
    }
}

export async function deleteComment(slug:string, id:string):Promise<Boolean>{
    const repo = getRepository(Comment)
    const commentToDelete = await repo.findOne(id)
    if(!commentToDelete) throw new Error('No article found with given id')

    try{
        const deleted = await repo.remove(commentToDelete)
        return true
    }catch(e){
        throw(e)
    }

}