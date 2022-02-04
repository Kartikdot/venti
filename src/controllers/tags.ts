import { getRepository } from "typeorm";
import { Tag } from "../entities/Tag";

export async function saveTags(tags:string[]){
    const repo = getRepository(Tag)
    try{
        tags.forEach(async tag => {
            await repo.save({tagname:tag})
        });
    }catch(e){
        throw e
    }
}

export async function getTags():Promise<string[]>{
    const repo = getRepository(Tag)
    let response :string[] = []
    try{
        const tags = await repo.find()
        tags.forEach(tag => {
            response.push(tag.tagname)
        });
        return response
    }catch(e){
        throw e
    }
}