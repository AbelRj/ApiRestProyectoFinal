
import { Request, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source";
import { validate } from "class-validator";
import { Profile } from "../entity/Profile";
import { Photo } from "../entity/Photo";


export class UserController {

    static newUser = async (req:Request, res:Response) => {
        const photoRepo = AppDataSource.getRepository(Photo)
        const {username,password,role,name,photos} = req.body
        const user = new User();
        user.username =username;
        user.password= password;
        user.role = role;

        const photoToSave:Photo[]=[];
        for(let i=0;i<photos.length;i++){
            const photoi = new Photo();
            photoi.url=photos[i];
            photoi.profile=user.profile;

            try {
                await photoRepo.save(photoi);
            } catch (error) {
                return res.status(409).json({message:'photo already exist'})
            }
            photoToSave.push(photoi);
        }

        const profile = new Profile();
        profile.name = name;
        profile.photos = photoToSave;
        user.profile = profile;



        const validationOpt = {validationError: {target: false, value: false}};
        const errors = await validate(user, validationOpt);
        if(errors.length > 0) return res.status(400).json(errors);

        const userRepository = AppDataSource.getRepository(User)
        try{
            user.hashPassword();
            await userRepository.save(user);
        } catch (error){
            return res.status(500).json({message:"Error creating user",
        error: error.message})
        }
        return res.status(201).json({
            message:"User created"
        })
    }

    static getUsers = async (req:Request, res:Response) => {
        try{
            const userRepo = AppDataSource.getRepository(User);
            const users = await userRepo.find(
                {relations: ["profile","profile.photos"]});
            if(users.length === 0) return res.status(404).json({message: 'Users not found'});
            return res.status(200).json(users);
        }catch(error){
            return res.status(400).json(error);
        }

    }

    static getByUserId = async (req:Request, res:Response) => {
        
            const {id} = req.params;
            const userRepo = AppDataSource.getRepository(User);
        try{
            const user = await userRepo.findOneByOrFail({id:parseInt(id)});
            res.send(user)
        }catch(error){
             res.status(400).json({
                message:"User not found",
                error: error.message
             });
        }
    }

    static delete = async (req:Request, res:Response) => {
       const {id} = req.params;
       const userRepo = AppDataSource.getRepository(User);
       
        try {
            await userRepo.delete(id);
            return res.status(200).json({
                message: "User Deleted"
                });
    } catch (error){
         res.status(500).json({
            message: "Error deleting the user",
            error: error.message
            })
    }
}

static update = async (req:Request, res:Response) => {
        let user;
        const {id} = req.params;
        const{username, password, role} = req.body;
        const userRepo = AppDataSource.getRepository(User);
    try {
        user = await userRepo.findOneByOrFail({id: parseInt(id)});
        user.username = username;
        user.password = password;
        user.role = role; 
    } catch (error) {
        return res.status(400).json({
            message: 'User not found',
            error: error.message
        });
    }
    const validationOpt = {validationError: {target: false, value: false}};
    const errors = await validate(user, validationOpt);
    if (errors.length > 0){
        return res.status(400).send(errors)
    }
    try {
        await userRepo.save(user);
            } catch (error) {
                res.status(500).json({
                    message: "Error updating user",
                    error: error.message
                    });
                }
                return res.status(204).json({
                    message: "User Updated",
                    });
}

}