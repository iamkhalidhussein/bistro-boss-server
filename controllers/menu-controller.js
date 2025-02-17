const { client } = require("../config/db");

const menuCollection = client.db('BistroDb').collection('menu');

const getAllMenu = async(req, res) => {
    try {
        const result = await menuCollection.find().toArray();
        res.send(result);
    } catch (error) {
        console.error('error in menu-controller getAllMenu()');
        res.status(500).send({ message: error.message });
    }
};

const getMenu = async(req, res) => {
    try {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await menuCollection.findOne(query);
        res.send(result);
    } catch (error) {
        console.error('error in user-controller getMenu()');
        res.status(500).send({ message: error.message });
    }
};

const createMenu = async(req, res) => {
    try {
        const item = req.body;
        console.log(item)
        const result = await menuCollection.insertOne(item);
        res.send(result);
    } catch (error) {
        console.error('error in user-controller createMenu()');
        res.status(500).send({ message: error.message });
    }
};

const updateMenuItem = async (req, res) => {
    try {
        const item = req.body;
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };

        const updatedDoc = {
            $set: {
                name: item.name,
                category: item.category,
                price: item.price,
                recipe: item.recipe,
                image: item.image
            }
        };

        const result = await menuCollection.updateOne(filter, updatedDoc);
        res.send(result);
    } catch (error) {
        console.error('Error in updateMenuItem:', error);
        res.status(500).json({ message: 'Failed to update menu item', error: error.message });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const result = await menuCollection.deleteOne(query);
        res.send(result);
    } catch (error) {
        console.error('Error in deleteMenuItem:', error);
        res.status(500).json({ message: 'Failed to delete menu item', error: error.message });
    }
};

module.exports = { getAllMenu, getMenu, createMenu, updateMenuItem, deleteMenuItem };