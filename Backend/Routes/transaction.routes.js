import { Router } from 'express';
import { getTransactions } from '../controllers/listTranscation.controller.js';

const router = Router();

// Define the route for fetching transactions
router.get('/transactions', getTransactions);

export default router;
