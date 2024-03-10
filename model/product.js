const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: [String], required: true },
    sizes: { type: [String], required: true },
    colors: { type: [String], required: true },
    rating: { type: Number, required: true },
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
