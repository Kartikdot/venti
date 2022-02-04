import {Column, Entity, PrimaryColumn} from 'typeorm'
@Entity('tags')
export class Tag{
    @PrimaryColumn()
    tagname: string
}