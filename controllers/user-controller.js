const { client } = require("../config/db");

const userCollection = client.db('BistroDb').collection('user');

const getUsers = async(req, res) => {
    try {
        console.log(req.headers);
        const result = await userCollection.find().toArray();
        res.send(result);
    } catch (error) {
        console.error('error in user-controller', error);
        res.status(500).send({ message: error.message });
    }
};

const getAdminStatus = async(req, res) => {
    try {
        const email = req.params.email;
        if(email !== req.decoded.email) {
            return req.status(403).send({message: 'unauthorized access'});
        }
        const query = { email: email };
        const user = await userCollection.findOne(query);
        let admin = false;
        if(user) {
            admin = user.role === 'admin'
        }; 
        res.send({ admin });
    } catch (error) {
        console.error('error in user-controller getAdminStatus()');
        res.status(500).send({ message: error.message });
    }
};

const saveUser = async(req, res) => {
    try {
        const user = req.body;
        const query = { email: user.email };
        const existingUser = await userCollection.findOne(query);
        if(existingUser) {
            return res.send({message: 'user already exists', insertedId: null})
        };
        const result = await userCollection.insertOne(user);
        res.send(result);
    } catch (error) {
        console.error('error in user-controller saveUser()');
        res.status(500).send({ message: error.message });
    }
};

const makeAdmin = async(req, res) => {
    try {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const updatedDoc = {
            $set: {
                role: 'admin'
            }
        }
        const result = await userCollection.updateOne(filter, updatedDoc);
        res.send(result);
    } catch (error) {
        console.error('error in user-controller makeAdmin()');
        res.status(500).send({ message: error.message });
    }
};

const deleteUser = async(req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await userCollection.deleteOne(query);
    res.send(result);
};

module.exports = { getUsers, getAdminStatus, saveUser, makeAdmin, deleteUser };