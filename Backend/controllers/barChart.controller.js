import Transaction from '../Models/transaction.js';

export const getBarChartData = async (req, res) => {
    const { month } = req.query; // Assuming month is provided as a number, e.g., "1" for January

    try {
        const barData = await Transaction.aggregate([
            {
                // Extract the month directly from the dateOfSale field
                $addFields: { monthOfSale: { $month: "$dateOfSale" } }
            },
            {
                $match: { monthOfSale: parseInt(month) } // Match the selected month
            },
            {
                $bucket: {
                    groupBy: "$price", // Group by price ranges
                    boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
                    default: "901-above",
                    output: { count: { $sum: 1 } } // Count the number of items in each range
                }
            }
        ]);

        const formattedBarData = barData.map(item => ({
            priceRange: item._id === "901-above" ? "901 and above" : `${item._id}-${item._id + 99}`,
            count: item.count
        }));

        res.json(formattedBarData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
