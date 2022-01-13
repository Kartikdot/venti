import bcrypt from 'bcrypt'


export async function hashPassword(password:string): Promise<string>{
    return new Promise<string>((resolve, reject)=>{
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash)=>{
            if(err) reject(err)
    
            resolve(hash)
        })
    })

}

export async function validatePassword(password:string, hash:string): Promise<boolean>{
    return new Promise<boolean>((resolve, reject)=>{
        bcrypt.compare(password, hash, (err, result)=>{
            if(err) reject(err)

            resolve(result)
        })
    })
}