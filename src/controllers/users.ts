import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { usersRoute } from "../routes/users";
import { sign } from "../utils/jwt";
import { hashPassword, validatePassword } from "../utils/password";
import { sanitizeUser } from "../utils/security";

interface UserSignupData{
    username:string
    email:string
    password:string
}

interface UserLoginData{
    email: string
    password:string
}

interface UserUpdateData{
    username?:string
    passowrd?:string
    bio?:string
    image?:string
}

export async function createUser(data:UserSignupData): Promise<User> {
    if(!data.username) throw new Error('Username is empty')
    if(!data.email) throw new Error('email is empty')
    if(!data.password) throw new Error('password is empty')

    const repo = await getRepository(User);
    
    if(await repo.findOne(data.email)) throw new Error("User with this email already exists")

    try{
        const hashedPassword:string = await hashPassword(data.password)
        const user:User = await repo.save(new User(data.email, hashedPassword, data.username))
        user.token = await sign(user)
        return sanitizeUser(user);
    }catch(e){
        throw(e)
    }

}

export async function loginUser(data:UserLoginData): Promise<User> {
    if(!data.email) throw new Error('email is empty')
    if(!data.password) throw new Error('password is empty')

    const repo = await getRepository(User);
    const user = await repo.findOne(data.email)

    if(!user) throw new Error("User with this email does not exist")

    const passMatched = await validatePassword(data.password, user.password!)
    if(!passMatched) throw new Error('wrong password')
    user.token = await sign(user)
    return sanitizeUser(user)

}

export async function getUserByEmail(email:string): Promise<User>{
    const repo = await getRepository(User)
    const user = await repo.findOne(email)

    if(!user) throw new Error("User with this email does not exist")

    return sanitizeUser(user)
}

export async function updateUser(data:UserUpdateData, email:string): Promise<User>{
    if(!data.username && !data.passowrd && !data.bio && !data.image) throw new Error('Atleast one field is required to perform update')
    const repo = await getRepository(User)
    const user = await repo.findOne(email)

    if(!user) throw new Error("User with this email does not exist")
    if(data.username) user.username = data.username
    if(data.passowrd) user.password = await hashPassword(data.passowrd)
    if(data.bio) user.bio = data.bio
    if(data.image) user.image = data.image
    const replacedUser = await repo.save(user)

    return sanitizeUser(replacedUser)
}