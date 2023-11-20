import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Profile } from "../entity/Profile";

export class ProfileController {
  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const profileRepository = AppDataSource.getRepository(Profile);
    let profile: Profile;
    try {
      profile = await profileRepository.findOneByOrFail({ id: parseInt(id) });
    } catch (error) {
      return res.status(404).json({
        message: "profile not found",
        error: error.message,
      });
    }
    try {
      await profileRepository.delete(id);
      res.status(200).json({
        message: "Profile deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting the profile",
        error: error.message,
      });
    }
  };
  
  static update = async (req:Request, res: Response) =>{
    let profile;
    const {id}=req.params;
    const {name}=req.body;
    const profileRepository=AppDataSource.getRepository(Profile)
    try{
       profile=await profileRepository.findOneByOrFail({id:parseInt(id)})
       profile.name=name;
    }catch(error){
      return res.status(404).json({
          message:"Profile not found",
          error:error.message
      })
    }
    try{
      await profileRepository.save(profile)
      res.status(200).json({
          message:"Profile updated"
      })
    }catch(error){
      res.status(500).json({
          message:"Error updating the profile",
          error:error.message
      })
    }
  }
}
