import { Request, Response } from "express";
import { Category } from "../entity/Category";
import { AppDataSource } from "../data-source";

export class CategoryController{
   
    static new = async(req:Request,res:Response)=>{
        const {name}=req.body;
        const category= new Category();
        category.name=name;
        
        const CategoryRepository=AppDataSource.getRepository(Category);
        try{
            await CategoryRepository.save(category);
        }catch(e){
            return res.status(409).json({message:'category already exists'});
        }
        res.send('category created');
    }

    static getAll = async(req:Request, res:Response)=>{
        const userRepository = AppDataSource.getRepository(Category);
        let categorys
        try {
            categorys = await userRepository.find(); 
        } catch (error) {
            res.status(404).json({ message: 'Somenthing goes wrong!' });
        }
    
        if (categorys.length > 0) {
            res.send(categorys);
        } else {
            res.status(404).json({ message: 'not result' });
        }
    }

    
}