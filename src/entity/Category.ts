import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";


@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    @IsNotEmpty()
    name: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(()=>Product,(producto)=>producto.id)
    products:Product[]
}