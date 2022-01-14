import {Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm'
import { User } from './User'

@Entity('articles')
export class Article{

    @PrimaryColumn({length:30})
    slug:string

    @Column({length: 40})
    title: string

    @Column({type: 'text', nullable: true})
    description?: string

    @Column({type: 'text'})
    body: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(()=> User)
    author: User

    constructor(slug: string, title:string, body:string, author:User, description:string){
        this.slug = slug
        this.title = title
        this.body = body
        this.author = author
        this.description = description
    }

    
}