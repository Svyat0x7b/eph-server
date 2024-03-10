require('dotenv').config({ path: '.env' });
require('../config/db').connect();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('../router/auth');
const productRouter = require('../router/product');
const searchRouter = require('../router/search');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/search', searchRouter);

app.get('/', (req, res) => res.send('Euphoria Server!'));

app.listen(PORT, () => console.log('Server running...'));
