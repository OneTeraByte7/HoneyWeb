
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();


const User = require('./models/User');
const { authenticateToken } = require('./middleware/auth');


const authRoutes     = require('./routes/auth');
const checkoutRoutes = require('./routes/checkout');

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/auth',     authRoutes);
app.use('/api/checkout', checkoutRoutes);


app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name email');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
