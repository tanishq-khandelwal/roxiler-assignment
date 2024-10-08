import Transaction from "../Models/transaction.js";

export const getTransactions = async (req, res) => {
    try {
        const { search, month, page = 1, perPage = 10 } = req.query;

        const matchStage = {};

        // Add search filter for title, description, or price if search is provided
        if (search) {
            matchStage.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { price: { $eq: parseFloat(search) } }, // Optional: If user searches by price
            ];
        }

        // Add month filter (ignoring the year)
        if (month) {
            matchStage.$expr = {
                $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
            };
        }

        // Pagination variables
        const skip = (page - 1) * perPage;

        // Use an aggregation pipeline to match and paginate the results
        const transactions = await Transaction.aggregate([
            { $match: matchStage },   // Match by search and month
            { $sort: { _id: 1 } }, // Sort by date (most recent first)
            { $skip: skip },          // Skip to the correct page
            { $limit: parseInt(perPage) }, // Limit the results per page
        ]);

        // Count total number of transactions for pagination
        const total = await Transaction.countDocuments(matchStage);

        res.status(200).json({ transactions, total });
    }  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
