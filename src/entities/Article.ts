import { type } from 'os'
import {Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm'
import { Tag } from './Tag'
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

    @Column('varchar', {name:'tags', array:true, nullable:true})
    tagList?: string[]

    constructor(slug: string, title:string, body:string, author:User, description:string, tagList?:string[]){
        this.slug = slug
        this.title = title
        this.body = body
        this.author = author
        this.description = description
        if(tagList) this.tagList = tagList
    }

    
}