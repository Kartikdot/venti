import {Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import { User } from './User'

@Entity('comments')
export class Comment{

    @PrimaryGeneratedColumn()
    id:number

    @Column({type: 'text'})
    body: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(()=> User)
    author: User
}