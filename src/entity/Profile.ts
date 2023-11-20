import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Photo } from "./Photo";


@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @OneToOne(()=>User,(user)=>user.profile,{
        onDelete:"CASCADE"
    })
    user:User

    @OneToMany(()=>Photo,(photo)=>photo.profile,{
        onDelete:"CASCADE"
    })
    photos:Photo[]
    profile:Profile

}
