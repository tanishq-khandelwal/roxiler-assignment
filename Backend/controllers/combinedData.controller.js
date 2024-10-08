// combinedDataController.js

import axios from 'axios';

// Replace these with your actual API URLs
const API1_URL = 'http://localhost:3000/api/v1/pie-chart'; // Pie chart API
const API2_URL = 'http://localhost:3000/api/v1/transactions'; // Transactions API
const API3_URL = 'http://localhost:3000/api/v1/bar-chart'; // Bar chart API

export const getCombinedData = async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: "Month parameter is required." });
    }

    try {
        // Fetch data from the three APIs, passing the month as a query parameter
        const [api1Response, api2Response, api3Response] = await Promise.all([
            axios.get(`${API1_URL}?month=${month}`),
            axios.get(`${API2_URL}?month=${month}`),
            axios.get(`${API3_URL}?month=${month}`),
        ]);

        // Combine the responses
        const combinedData = {
            Transactions: api2Response.data,
            pieChart: api1Response.data,
            
            Barchart: api3Response.data,
        };

        // Send the combined response
        res.json(combinedData);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch combined data." });
    }
};
