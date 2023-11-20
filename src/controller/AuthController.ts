import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import config from "../config/config";
import * as jwt from "jsonwebtoken";
import { transporter } from "../config/mailer";


class AuthController {

    static async login(req: Request, res: Response) {
        const {username, password} = req.body;
        if(!(username && password)){
            return res.status(400).json({message: "User & Password are required!"});
        }
        const authRepo = AppDataSource.getRepository(User);
        let user : User;
        try{
            user = await authRepo.findOneOrFail({
                where:{
                    username
                }});
        }catch(error){
            return res.status(452).json({message:'User incorrect'});
        }
        if(!user.checkPassword(password)){
            return res.status(400).json({message: "Password is incorrect!"});
        }

        const token = jwt.sign(
            {userId:user.id,username},
            config.jwtSecret,{expiresIn:'1h'}
        )

        return res.status(200).json({message:'login',token})

    }

    static forgotPassword = async (req: Request, res: Response) =>{
        const {username}=req.body;
        if(!(username)){
            return res.status(400).json({message:"Username is required"})
        }
        let message='Revisa tu email el link de reset fue enviado';
        let veriyLink;
        let emailStatus='ok';
        const authRepo=AppDataSource.getRepository(User);
        let user:User;
        try{
            user=await authRepo.findOneOrFail(
                {where:{
                    username
                }
            })
            const token=jwt.sign({userId:user.id,username},config.jwtSecret,{expiresIn:'20min'})
            veriyLink=`http://localhost:4200/new-password/${token}`;
        }catch(error){
            message='el usuario no existe';
            return res.status(452).json({message})
        }
        try{
            await transporter.sendMail({
                from:'"Fredr Foo " <foo@example.com>',
                to: user.username,
                subject:"hello",
                text:"Hello world",
                html:`<b>Cambio de password</b>
                <a hrf="${veriyLink}">${veriyLink}</a>
                `,
            });
        } catch(error){
            emailStatus = 'ERROR';
            return res.status(452).json({message:'Error al enviar el email'})
        }
        try{
            await authRepo.save(user);
        } catch (error){
            message = 'Error al guardar el token';
            emailStatus = 'ERROR';
            return res.status(452).json({message})
        }
        res.json({message, emailStatus, veriyLink})
    }


}
export default AuthController