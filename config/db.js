const mongoose = require('mongoose');

const { DB_URL } = process.env;

exports.connect = () => {
    mongoose
        .connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(console.log('DB connected successfully!'))
        .catch((err) => {
            console.log('DB connection failed!');
            console.log(error);
            process.exit(1);
        });
};
