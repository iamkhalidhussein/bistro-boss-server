const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPEZ_SECRET_KEY)
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

const jwtRoutes = require('./routes/jwt-routes');
const userRoutes = require('./routes/userRoutes');
const menuRoutes = require('./routes/menu-routes');
const reviewRoutes = require('./routes/review-routes');
const cartRoutes = require('./routes/cart-routes');
const orderRoutes = require('./routes/order-routes');
const adminRoutes = require('./routes/admin-routes');
const paymentRoutes = require('./routes/paymentRoutes');
const { connectDB } = require('./config/db');

// routes
app.use('/jwt', jwtRoutes);
app.use('/users', userRoutes);
app.use('/menu', menuRoutes);
app.use('/reviews', reviewRoutes);
app.use('/carts', cartRoutes);
app.use('/order', orderRoutes);
app.use('/admin', adminRoutes);
app.use('/payments', paymentRoutes);

app.get('/', async(req, res) => {
    res.send('boss is sitting here');
});


//connect to MongoDB
connectDB();

app.listen(port, () => {
    console.log(`Bistro boss is sitting on port ${port}`);
});