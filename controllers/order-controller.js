const getOrderStats = async (req, res) => {
    try {
        const result = await paymentCollection.aggregate([
            {
                $unwind: '$menuItemIds'
            },
            {
                $lookup: {
                    from: 'menu',
                    localField: 'menuItemIds',
                    foreignField: '_id',
                    as: 'menuItems'
                }
            },
            {
                $unwind: '$menuItems'
            },
            {
                $group: {
                    _id: '$menuItems.category',
                    quantity: { $sum: 1 },
                    revenue: { $sum: '$menuItems.price' }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    quantity: '$quantity',
                    revenue: '$revenue'
                }
            }
        ]).toArray();

        res.send(result);
    } catch (error) {
        console.error('Error in getOrderStats:', error);
        res.status(500).json({ message: 'Failed to fetch order statistics', error: error.message });
    }
};

module.exports = { getOrderStats };