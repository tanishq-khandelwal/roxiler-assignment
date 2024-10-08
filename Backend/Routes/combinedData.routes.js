import { Router } from 'express';
import { getCombinedData } from '../controllers/combinedData.controller.js';

const router = Router();

// Define the route for fetching combined data
router.get('/combined-data', getCombinedData);

export default router;
