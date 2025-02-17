const getAllReviews = async(req, res) => {
    try {
        const result = await reviewCollection.find().toArray();
        res.send(result);
    } catch (error) {
        console.error('error in review-controller getAllReviews()');
        res.status(500).send({ message: error.message });
    }
};

module.exports = { getAllReviews };