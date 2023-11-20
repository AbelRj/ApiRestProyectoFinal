import { Router } from "express";
import { UserController } from "../controller/UserController";
import { checkJwt } from "../middleware/jwt";


const router = Router();
router.post('/',UserController.newUser)
router.get('/',UserController.getUsers)
router.get('/:id', UserController.getByUserId)
router.delete('/:id',UserController.delete)
router.patch('/:id',UserController.update)




export default router;