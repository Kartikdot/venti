import { Request } from "express";
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
*/
export async function getRecentArticles(data: Request):Promise<Article[]>{
    const tags = data.query.tags
    const author = data.query.author
    const limit = data.query.limit? parseInt(data.query.limit.toString()) : 20
    const offset = data.query.offset? parseInt(data.query.offset.toString()) : 0
    const repo:Repository<Article> = getRepository(Article)
    try{
        let query = await repo.createQueryBuilder("article")
                            .leftJoinAndSelect("article.author", "user")
        
        if(tags) query.orWhere("article.tagList @> :tags", {tags: tags})
        if(author) query.orWhere("user.username = :username", {username: author.toString()})
        if(limit) query.limit(limit)
        if(offset) query.offset(offset)
        
        const articles = query.getMany()
        console.log(articles)
        return articles
    }catch(e){
        throw e
    }
}

export async function getArticleBySlug(slug:string):Promise<Article>{
    const repo:Repository<Article> = getRepository(Article)
    try{
        const article = await repo.findOne(slug, {relations: ['author']})
        if(!article) throw new Error('Article with given slug not found')
        article.author = sanitizeUser(article.author)
        return article
    }catch(e){
        throw e
    }
}

export async function createArticle(data:CreateArticleData, email:string):Promise<Article>{
    if(!data.title) throw new Error('Title is empty')
    if(!data.body) throw new Error('Title is empty')
    if(!data.description) throw new Error('Title is empty')
    const articleRepo:Repository<Article> = getRepository(Article)
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
    const repo:Repository<Article> = getRepository(Article)
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
    const repo:Repository<Article> = getRepository(Article)
    
    try{
        const articleToUpdate = await repo.findOne(slug)
        if(!articleToUpdate) throw new Error('Article with given slug not found')
        const article = await repo.save(articleToUpdate)
        return article
    }catch(e){
        throw(e)
    }
}
