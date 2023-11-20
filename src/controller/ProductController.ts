import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { Category } from "../entity/Category";
import { In } from "typeorm";

export class ProductController{
    
    static new = async(req:Request,res:Response)=>{
        const {name,price,categories}=req.body;
        const product= new Product();
       
        
        const categoryRepo=AppDataSource.getRepository(Category);
        const productRepository=AppDataSource.getRepository(Product);
        try{
            const contegoryId= await categoryRepo.findBy({id:In(categories)});
            console.log(contegoryId.length);
            if(contegoryId.length==0){
                return res.status(409).json({message:'category not found'});
            }
            product.name=name;
            product.price=price;
            product.categories=contegoryId;
        } catch(error){
            return res.status(409).json({message:'category not found'});

        }
        try{
            await productRepository.save(product);
        }catch(e){
            return res.status(409).json({message:'category already exists'});
        }
        res.send('product created');
    }

    static getAll = async(req:Request,res:Response)=>{
        const productRepository=AppDataSource.getRepository(Product);
        let products;
        try{
            products= await productRepository.find({
                relations:['categories']
            });
        } catch(e){
            return res.status(409).json({message:'category not found'});

        }
        if(products.length>0){
            return res.send(products);
        } else{
            return res.status(404).json({message:'no products found'});
        }
    }

    static getById = async(req:Request,res:Response)=>{
        const{id}=req.params;
        const productRepository=AppDataSource.getRepository(Product);
        let product;
        try{
            product = await productRepository.createQueryBuilder("product")
            .leftJoinAndSelect("product.categories","categories")
            .where("product.id = :id", { id: id })
            .getOne();
            if(product==null){
                return res.status(404).json({message:'product not found'});
            }
        } catch(error){
            return res.status(404).json({message:'product not found'});
        }
        return res.status(200).json(product);
    }

    static update =async (req:Request,res:Response) =>{
        const {id} = req.params;
        const{name, price, categories} = req.body;
        const productRepository = AppDataSource.getRepository(Product);
        const CategoryRepo = AppDataSource.getRepository(Category);
        let product;
        try{
            product =await productRepository.createQueryBuilder("product")
            .leftJoinAndSelect("product.categories","categories")
            .where("product.id = :id", { id: id })
            .getOne()
            if(product==null){
                return res.status(404).json({messge:'product not found'})
            }
            }catch(error){
            return res.status(404).json({message:"product not found"})
            }
            try{
                const contegoryId = await CategoryRepo.findBy({id:In(categories)});
                console.log(contegoryId.length);
                if(contegoryId.length==0){
                    return res.status(409).json({messafe:'category not found'});
                }
                product.name=name;
                product.price=price;
                product.categories=contegoryId;
            }catch(error){
                return res.status(409).json({message:'category not found'});   
            }
            try{
               await productRepository.save(product); 
            }catch(e){
                return res.status(409).json({message:'product already axists'});  
            }
            res.status(200).json({message:'product updated'});
        }
    
    static delete = async (req:Request,res:Response) =>{
        const {id} = req.params;
        const productRepository = AppDataSource.getRepository(Product);
        let product;
        try{
            product = await productRepository.createQueryBuilder("product")
            .leftJoinAndSelect("product.categories","categories")
            .where("product.id = :id", { id: id })
            .getOne();
            if(product==null){
                return res.status(404).json({message:'product not found'});
            }
        }catch(error){
            return res.status(404).json({message:'product not found'});
        }
        
        try{
            await productRepository.remove(product);
        }catch(e){
            return res.status(409).json({message:'product already exists'});
            }
           res.status(200).json({message:'product deleted'}); 
            
        
    }
}
        
        
    

export default ProductController