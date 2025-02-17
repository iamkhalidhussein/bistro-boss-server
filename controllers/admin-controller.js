const getAdminStats = async (req, res) => {
    try {
        // Fetching counts using MongoDB's estimatedDocumentCount for performance
        const [users, menuItems, orders] = await Promise.all([
            userCollection.estimatedDocumentCount(),
            menuCollection.estimatedDocumentCount(),
            paymentCollection.estimatedDocumentCount()
        ]);

        // Calculating total revenue using aggregation
        const revenueResult = await paymentCollection.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$price' }
                }
            }
        ]).toArray();

        const revenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

        // Sending the final stats
        res.send({ users, menuItems, orders, revenue });
    } catch (error) {
        console.error('Error in getAdminStats:', error);
        res.status(500).json({
            message: 'Failed to fetch admin statistics',
            error: error.message
        });
    }
};

module.exports = { getAdminStats };