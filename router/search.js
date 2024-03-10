const express = require('express');
const router = express.Router();
const ProductModel = require('../model/product');

router.get('/', async (req, res) => {
    const searchTerm = req.query.q;

    if (!searchTerm || searchTerm.length < 3) {
        res.status(405).json({ message: 'Search query must contain 3 or more symbols!' });
        return;
    }

    const searchRegex = new RegExp(searchTerm, 'i');

    const matchedProducts = await ProductModel.find({
        title: searchRegex,
    });

    if (matchedProducts.length === 0) {
        res.status(404).json({ message: 'There are no matches to your search!' });
        return;
    }

    const searchProducts = matchedProducts.map((product) => {
        return {
            _id: product._id,
            id: product.id,
            title: product.title,
            image: product.img[0],
        };
    });

    res.status(200).json(searchProducts);
});

module.exports = router;
