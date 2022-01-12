import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { sanitizeUserResponse } from "../utils/security";

interface UserSignupData{
    username:string
    email:string
    password:string
}

interface UserLoginData{
    email: string
    password:string
}

export async function createUser(data:UserSignupData): Promise<User> {
    //TODO: hash password
    //TODO: add jwt token and sanitize reponse
    if(!data.username) throw new Error('Username is empty')
    if(!data.email) throw new Error('email is empty')
    if(!data.password) throw new Error('password is empty')

    const repo = await getRepository(User);
    
    if(await repo.findOne(data.email)) throw new Error("User with this email already exists")

    try{
        const user = await repo.save(new User(data.email, data.password, data.username))
        return sanitizeUserResponse(user);
    }catch(e){
        throw(e)
    }

}

export async function loginUser(data:UserLoginData): Promise<User> {
    //TODO: password match
    //TODO: Add jwt token
    if(!data.email) throw new Error('email is empty')
    if(!data.password) throw new Error('password is empty')

    const repo = await getRepository(User);
    const user = await repo.findOne(data.email)

    if(!user) throw new Error("User with this email does not exist")

    if(user.password != data.password) throw new Error("Wrong password")
    
    return sanitizeUserResponse(user)

}