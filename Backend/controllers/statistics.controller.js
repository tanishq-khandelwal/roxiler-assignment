import Transaction from '../Models/transaction.js';

export const getStatistics = async (req, res) => {
    const { month } = req.query; // Assuming month is provided as a number

    try {
        const totalSales = await Transaction.aggregate([
            {
                // Extract the month directly from the dateOfSale field
                $addFields: { monthOfSale: { $month: "$dateOfSale" } }
            },
            {
                // Match transactions that occurred in the specified month
                $match: { monthOfSale: parseInt(month) }
            },
            {
                // Group to calculate total sale amount, total sold items, and total not sold items
                $group: {
                    _id: null,
                    totalSaleAmount: {
                        $sum: {
                            $cond: [
                                { $eq: ["$sold", true] }, // Check if sold is true
                                "$price", // Include price if sold
                                0 // Otherwise, include 0
                            ]
                        }
                    },
                    totalSoldItems: { $sum: { $cond: ["$sold", 1, 0] } }, // Count sold items
                    totalNotSoldItems: { $sum: { $cond: ["$sold", 0, 1] } } // Count not sold items
                }
            }
        ]);

        res.json(totalSales[0] || { totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
