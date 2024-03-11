const mongoose = require('mongoose');
const { DB_URL } = process.env;

mongoose
    .connect(DB_URL)
    .then(() => console.log('DB connected successfully!'))
    .catch((error) => {
        console.error('DB connection failed:', error);
    });

module.exports = mongoose.connection;
