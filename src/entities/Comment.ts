import {Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import { User } from './User'

@Entity('comments')
export class Comment{

    @Column({select:false})
    slug:string

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar', length:150})
    body: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(()=> User)
    author: User

    constructor(slug: string, body: string, author:User){
        this.slug = slug
        this.body = body
        this.author = author
    }
}