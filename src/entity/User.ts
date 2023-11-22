import { IsEmail, IsNotEmpty } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToOne, JoinColumn } from "typeorm"
import * as bcrypt from 'bcryptjs'
import { Profile } from "./Profile"

@Entity()
@Unique(["username"])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    @IsEmail()
    username: string

    @Column()
    @IsNotEmpty()
    password: string

    @Column()
   // @IsNotEmpty()
    role: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
/*
@OneToOne(()=>Profile,(profile)=>profile.id,{
    cascade:true,
    onDelete:"CASCADE"
})
@JoinColumn()
profile:Profile;
*/

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(12)
           this.password = bcrypt.hashSync(this.password, salt)   
       }
   
    checkPassword(password: string): boolean {
           return bcrypt.compareSync(password, this.password)
       }

}
