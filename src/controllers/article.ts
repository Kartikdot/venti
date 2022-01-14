import { getRepository, Repository } from "typeorm";
import { Article } from "../entities/Article";
import { User } from "../entities/User";
import { sanitizeUser } from "../utils/security";
import { slugify } from "../utils/slugify";


interface CreateArticleData{
    title:string
    description:string
    body:string
}

interface UpdateArticleData{
    articleData:CreateArticleData
    slug:string
}

/*export async function getFeedArticles(slug:string):Promise<Article>{
    return 
}

export async function getRecentArticles(slug:string):Promise<Article>{
    return 
}

export async function getArticleBySlug(slug:string):Promise<Article>{
    return 
}
*/
export async function createArticle(data:CreateArticleData, email:string):Promise<Article>{
    //TODO: data validation
    const articleRepo:Repository<Article> = getRepository(Article)
    const userRepo = getRepository(User)

    const user = await userRepo.findOne(email)
    if(!user) throw new Error('No user with the given email found')

    const slug:string = slugify(data.title)
    if(await articleRepo.findOne(slug)) throw new Error('Create article request fialed, try again')

    try{
        const article = await articleRepo.save(new Article(slug, data.title, data.body, sanitizeUser(user), data.description))
        return article
    }catch(e){
        throw(e)
    }

}

/*export async function deleteArticle(data:CreateArticleData):Promise<Boolean>{
    return 
}

export async function updateArticle(data:UpdateArticleData):Promise<Article>{
    return 
}*/