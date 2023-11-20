import { Router } from "express";
import { CategoryController } from "../controller/CategoryController";

const router=Router();
router.post('/',CategoryController.new);
router.get('/', CategoryController.getAll);
export default router;


