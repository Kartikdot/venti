import { User } from "../entities/User";

export function sanitizeUserResponse(user:User): User{

    if(user.password!==null) delete user.password
    return user
}