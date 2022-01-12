import {Column, Entity, PrimaryColumn} from 'typeorm'

@Entity()
export class User{

    @PrimaryColumn()
    email: string

    @Column({unique: true, nullable: false})
    username: string

    @Column()
    password?:string

    @Column({type: 'text', nullable:true})
    bio?: string

    @Column({nullable: true})
    image?: string

    constructor(email:string, password: string, username:string){
        this.email = email;
        this.password = password;
        this.username = username;
    }
}