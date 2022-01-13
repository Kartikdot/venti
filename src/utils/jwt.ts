import  Jwt  from "jsonwebtoken";
import { User } from "../entities/User";

const secret_key = "this-is-very-secret-that-is-why-it-is-not-in-source-code"

export async function sign(user:User):Promise<string>{
    return new Promise<string>((resolve, reject)=>{
        Jwt.sign({email:user.email}, secret_key, (err:any, encoded:string | undefined)=>{
            if(err) reject(err)

            resolve(encoded as string)
        })
    })
    
}

export async function verify(token:string):Promise<User>{
    return new Promise<User>((resolve, reject)=>{
        Jwt.verify(token, secret_key, (err:any, decoded:any)=>{
            if(err) reject(err)

            resolve(decoded as User)
        })
    })
    
}