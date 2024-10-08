import { Router } from 'express';
import { getPieChartData } from '../controllers/pieChart.controller.js';

const router = Router();

// Define the route for fetching pie chart data
router.get('/pie-chart', getPieChartData);

export default router;
