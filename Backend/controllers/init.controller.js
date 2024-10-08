import axios from 'axios';
import Transaction from '../Models/transaction.js';

export const init = async (req, res, next) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;
        
        await Transaction.deleteMany();  // Clear existing data
        console.log(data);
        await Transaction.insertMany(data);  // Seed database

        res.status(200).json({ message: 'Database initialized with seed data' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
