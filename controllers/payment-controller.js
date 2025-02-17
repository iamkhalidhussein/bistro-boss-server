const createPaymentIntent = async (req, res) => {
    try {
        const { price } = req.body;
        const amount = Math.round(price * 100); // Convert price to cents

        console.log(amount, 'amount inside the intent');

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card']
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error in createPaymentIntent:', error);
        res.status(500).json({
            message: 'Failed to create payment intent',
            error: error.message,
        });
    }
};

const getPaymentsByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        // Check if the requesting user is authorized
        if (email !== req.decoded.email) {
            return res.status(403).send({ message: 'Forbidden access' });
        }

        const query = { email };
        const result = await paymentCollection.find(query).toArray();

        res.send(result);
    } catch (error) {
        console.error('Error in getPaymentsByEmail:', error);
        res.status(500).json({
            message: 'Failed to fetch payments',
            error: error.message,
        });
    }
};

const processPayment = async (req, res) => {
    try {
        const payment = req.body;

        const paymentResult = await paymentCollection.insertOne(payment);

        const query = {
            _id: { $in: payment.cartIds.map(id => new ObjectId(id)) }
        };
        const deleteResult = await cartCollection.deleteMany(query);

        console.log('Payment info:', payment);

        res.send({ paymentResult, deleteResult });
    } catch (error) {
        console.error('Error in processPayment:', error);
        res.status(500).json({
            message: 'Payment processing failed',
            error: error.message,
        });
    }
};

module.exports = { createPaymentIntent, getPaymentsByEmail, processPayment };