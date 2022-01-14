import { User } from "../entities/User";

export function sanitizeUser(user:User): User{

    if(user.password!==null) delete user.password
    return user
}