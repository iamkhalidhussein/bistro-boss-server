const getCarts = async (req, res) => {
    try {
        const email = req.query.email;
        const query = { email };
        const result = await cartCollection.find(query).toArray();
        res.send(result);
    } catch (error) {
        console.error('Error in getCarts carts-controller:', error);
        res.status(500).json({ message: 'Failed to fetch cart items', error: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const cartItem = req.body;
        const result = await cartCollection.insertOne(cartItem);
        res.send(result);
    } catch (error) {
        console.error('Error in addToCart carts-controller:', error);
        res.status(500).json({ message: 'Failed to add item to cart', error: error.message });
    }
};

const deleteCart = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await cartCollection.deleteOne(query);
        res.send(result);
    } catch (error) {
        console.error('Error in removeFromCart:', error);
        res.status(500).json({ message: 'Failed to remove item from cart', error: error.message });
    }
};

module.exports = { getCarts, addToCart, deleteCart };