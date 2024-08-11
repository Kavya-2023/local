import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Razorpay from 'razorpay';
dotenv.config();

import authRoutes from './routes/auth.js';
import districtRoutes from './routes/district.js';
import countryRoutes from './routes/country.js';

const PORT = process.env.PORT || 5000;
const app = express();
const allowedOrigins = ['http://localhost:3000', '*','https://local-kdy0.onrender.com'];
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,POST,PUT,DELETE', 
  allowedHeaders: 'Content-Type,Authorization' 
}));

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));


app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: "rzp_test_pnqesD1bWPOsNm",
      key_secret:"ThGU0itoGMUGidvtmbgYv12C"
    });
    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error creating order");
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating order");
  }
});

app.post('/order/validate', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sha = crypto.createHmac("sha256", "ThGU0itoGMUGidvtmbgYv12C");
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const signature = sha.digest("hex");

  if (signature !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id
  });
}); 
// Middleware
app.use(cors()); // Ensure CORS is enabled before other middleware
app.use(express.json()); // Built-in middleware for parsing JSON
app.use(express.urlencoded({ extended: true })); // Built-in middleware for parsing URL-encoded data

// Routes
app.use('/auth', authRoutes);
app.use('/district', districtRoutes);
app.use('/',countryRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Invalid JSON received:', err);
    return res.status(400).json({ error: 'Bad Request', message: 'Invalid JSON' });
  }
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });



