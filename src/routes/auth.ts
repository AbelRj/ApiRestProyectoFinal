import { Router } from "express";
import AuthController from "../controller/AuthController";
import router from "./user";


const routes = Router();

routes.post("/login", AuthController.login);
routes.put('/forgot-password',AuthController.forgotPassword);


export default routes;