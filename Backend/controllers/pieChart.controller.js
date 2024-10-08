import Transaction from '../Models/transaction.js';

export const getPieChartData = async (req, res) => {
    const { month } = req.query; // Assuming month is provided as a number

    try {
        const pieData = await Transaction.aggregate([
            {
                // Extract the month directly from the dateOfSale field
                $addFields: { monthOfSale: { $month: "$dateOfSale" } }
            },
            {
                $match: { monthOfSale: parseInt(month) } // Match the selected month
            },
            {
                // Group by category and count the number of items per category
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(pieData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
