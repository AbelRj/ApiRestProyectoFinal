import { Router } from "express";
import ProductController from "../controller/ProductController";

const router=Router();
router.post('/',ProductController.new);
router.get('/',ProductController.getAll);
router.get('/:id',ProductController.getById);
router.patch('/:id',ProductController.update);
router.delete('/:id',ProductController.delete);
export default router;
