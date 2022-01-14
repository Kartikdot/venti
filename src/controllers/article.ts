import { Article } from "../entities/Article";


interface CreateArticleData{
    title:string
    description:string
    body:string
}

interface UpdateArticleData{
    articleData:CreateArticleData
    slug:string
}

export async function getFeedArticles(slug:string):Promise<Article>{
    return 
}

export async function getRecentArticles(slug:string):Promise<Article>{
    return 
}

export async function getArticleBySlug(slug:string):Promise<Article>{
    return 
}

export async function createArticle(data:CreateArticleData):Promise<Article>{
    
}

export async function deleteArticle(data:CreateArticleData):Promise<Boolean>{
    return 
}

export async function updateArticle(data:UpdateArticleData):Promise<Article>{
    return 
}