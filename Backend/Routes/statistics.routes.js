import { Router } from 'express';
import { getStatistics } from '../controllers/statistics.controller.js';

const router = Router();

// Define the route for fetching statistics
router.get('/statistics', getStatistics);

export default router;
