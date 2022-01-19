import { getRepository, Repository } from "typeorm";
import { Article } from "../entities/Article";
import { User } from "../entities/User";
import { sanitizeUser } from "../utils/security";
import { slugify } from "../utils/slugify";


interface CreateArticleData{
    title:string
    description:string
    body:string
    tagList?:string[]
}

interface UpdateArticleData{
    title?:string
    description?:string
    body?:string
    tagList?:string[]
}

/*export async function getFeedArticles(slug:string):Promise<Article>{
    return 
}

export async function getRecentArticles(slug:string):Promise<Article>{
    return 
}
*/
export async function getArticleBySlug(slug:string):Promise<Article>{
    const repo:Repository<Article> = await getRepository(Article)
    try{
        const article = await repo.findOne(slug)
        if(!article) throw new Error('Article with given slug not found')
        return article
    }catch(e){
        throw e
    }
}

export async function createArticle(data:CreateArticleData, email:string):Promise<Article>{
    if(!data.title) throw new Error('Title is empty')
    if(!data.body) throw new Error('Title is empty')
    if(!data.description) throw new Error('Title is empty')
    const articleRepo:Repository<Article> = await getRepository(Article)
    const userRepo = getRepository(User)

    const user = await userRepo.findOne(email)
    if(!user) throw new Error('No user with the given email found')

    const slug:string = slugify(data.title)
    if(await articleRepo.findOne(slug)) throw new Error('Create article request fialed, try again')

    try{
        const article = await articleRepo.save(new Article(slug, data.title, data.body, sanitizeUser(user), data.description, data.tagList))
        return article
    }catch(e){
        throw(e)
    }

}

export async function deleteArticle(slug:string):Promise<Boolean>{
    const repo:Repository<Article> = await getRepository(Article)
    try{
        const articleToRemove = await repo.findOne(slug)
        if(!articleToRemove) throw new Error('Article with given slug not found')
        await repo.remove(articleToRemove)
        return true
    }catch(e){
        throw(e)
    }
    
}

export async function updateArticle(data:UpdateArticleData, slug:string):Promise<Article>{
    if(!data.title && !data.description && !data.body && !data.tagList) throw new Error('No data to update')
    const repo:Repository<Article> = await getRepository(Article)
    
    try{
        const articleToUpdate = await repo.findOne(slug)
        if(!articleToUpdate) throw new Error('Article with given slug not found')
        const article = await repo.save(articleToUpdate)
        return article
    }catch(e){
        throw(e)
    }
}