require('dotenv').config({ path: '.env' });
const express = require('express');
const cors = require('cors');
const authRouter = require('./router/auth');
const productRouter = require('./router/product');
const searchRouter = require('./router/search');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/search', searchRouter);

app.get('/', (req, res) => res.send('Euphoria Server!'));

db.on('connected', () => {
    app.listen(PORT, () => console.log('Server running...'));
});

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
