import { Router } from 'express';
import { getBarChartData } from '../controllers/barChart.controller.js';

const router = Router();

// Define the route for fetching bar chart data
router.get('/bar-chart', getBarChartData);

export default router;
