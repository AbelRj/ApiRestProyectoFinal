import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";



@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    @IsNotEmpty()
    name: string;
    @Column()
    price: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(()=>Category,(category)=>category.id)
    @JoinTable()
    categories:Category[]
}