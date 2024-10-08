import {Router} from 'express';
import {init} from "../controllers/init.controller.js"
const router=Router();

router.get('/init',init);


export default router;