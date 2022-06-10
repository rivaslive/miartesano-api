import Router from 'express';
import viewFile from '../controllers/viewFile';

const router = Router();

router.get('/public/:filename', viewFile);

export default router;
