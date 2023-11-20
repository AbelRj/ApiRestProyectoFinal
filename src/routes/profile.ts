import { Router } from "express";
import { ProfileController } from "../controller/ProfileController";


const router=Router()

router.delete('/:id',ProfileController.delete)
router.patch('/:id',ProfileController.update)
export default router;