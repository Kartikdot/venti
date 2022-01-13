import { NextFunction, Request, Response } from "express";
import { verify } from "../utils/jwt";

export async function tokenAuth(req: Request, res:Response, next:NextFunction){
    const authHeader = req.header('Authorization')
    
    if(!authHeader) return res.status(401).json({errors:{body:['Authorization Failed', 'No authorization header found']}})
    
    const token = authHeader.split(' ')

    if(token[0]!='token') return res.status(401).json({errors:{body:['Authorization Failed', 'No token found']}})

    try{
    const user = await verify(token[1])
    if(!user) throw new Error('No user found')
    ;(req as any).user = user;
    return next()
    }catch(e: any){
        return res.status(401).json({errors:{body:['Authorization Failed', e.message]}})
    }
}