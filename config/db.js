const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

//mongodb
const uri = process.env.MONGO_URI;
console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const connectDB = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

module.exports = { connectDB, client };