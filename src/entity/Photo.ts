import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  url:string;

  @ManyToOne(()=>Profile,(profile)=>profile.photos,{
    onDelete:"CASCADE"
  })
  profile:Profile;
}