const express = require('express');
const router = express.Router();
const ProductModel = require('../model/product');
const FeedbackModel = require('../model/feedback');
const generateFilter = require('../utils/filter');

router.get('/', async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    }
});

router.get('/men', async (req, res) => {
    try {
        const color = req.query.color;
        const size = req.query.size;
        const priceFrom = req.query.priceFrom;
        const priceTo = req.query.priceTo;

        const filter = generateFilter(color, size, priceFrom, priceTo, 'Man');

        const filteredProducts = await ProductModel.find(filter);

        if (!filteredProducts) {
            res.status(200).json({
                title: 'No such items',
                message: 'There is no such items found!',
            });
            return;
        }

        res.status(200).json(filteredProducts);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    }
});

router.get('/women', async (req, res) => {
    try {
        const color = req.query.color;
        const size = req.query.size;
        const priceFrom = req.query.priceFrom;
        const priceTo = req.query.priceTo;

        const filter = generateFilter(color, size, priceFrom, priceTo, 'Woman');

        const filteredProducts = await ProductModel.find(filter);

        if (!filteredProducts) {
            res.status(200).json({
                title: 'No such items',
                message: 'There is no such items found!',
            });
            return;
        }

        res.status(200).json(filteredProducts);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    }
});

router.get('/joggers', async (req, res) => {
    try {
        const color = req.query.color;
        const size = req.query.size;
        const priceFrom = req.query.priceFrom;
        const priceTo = req.query.priceTo;

        const filter = generateFilter(color, size, priceFrom, priceTo, 'Joggers');

        const filteredProducts = await ProductModel.find(filter);

        if (!filteredProducts) {
            res.status(200).json({
                title: 'No such items',
                message: 'There is no such items found!',
            });
            return;
        }

        res.status(200).json(filteredProducts);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    }
});

router.get('/featured', async (req, res) => {
    try {
        const products = await ProductModel.find({});

        if (!products || products.length === 0) {
            res.status(401).json({ message: 'There is no porducts in the db!' });
            return;
        }

        if (products.length <= 4) {
            res.status(200).json(products);
            return;
        }

        const featuredProducts = products.slice(0, 4);
        res.status(200).json(featuredProducts);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    }
});

router.get('/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await ProductModel.findOne({ id: productId });

        if (!product) {
            res.status(404).json({
                title: `Product not found`,
                message: `Product with id: ${productId} wasn't found!`,
            });
            return;
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ title: 'Internal Server Error', message: err });
    }
});

router.get('/:productId/feedbacks', async (req, res) => {
    const productId = req.params.productId;
    try {
        const specificFeedbacks = await FeedbackModel.find({ productId: productId });
        if (!specificFeedbacks) {
            res.status(404).json({
                title: `Feedbacks not found`,
                message: `Feedbacks for product id: ${productId} wasn't found!`,
            });
            return;
        }
        res.status(200).json(specificFeedbacks);
    } catch (err) {
        res.status(500).json({ title: 'Internal Server Error', message: err });
    }
});
router.post('/:productId/feedbacks', async (req, res) => {
    const productId = req.params.productId;
    const { email, username, feedback } = req.body;
    //validate that data
    if (!(email && username && feedbacks)) {
        res.status(400).json({ title: 'Empty fields!', message: 'All fields are required!' });
        return;
    }

    if (!email.includes('@')) {
        res.status(400).json({ title: 'Invalid email!', message: 'Your email are invalid!' });
        return;
    }

    if (username.trim().length < 3) {
        res.status(400).json({
            title: 'Invalid username!',
            message: 'Your username must contain 3 or more symbols!',
        });
        return;
    }
    if (feedback.trim().length < 3 || feedback.trim().length > 1500) {
        res.status(400).json({
            title: 'Invalid feedback!',
            message: 'Your feedback must contain more than 3 or less than 1500 symbols!',
        });
        return;
    }
    //validate object with that id
    const isProductExist = await ProductModel.findOne({ id: id });

    if (!isProductExist) {
        res.status(400).json({
            title: 'Invalid product id!',
            message: 'Your product id does`nt exist in database!',
        });
        return;
    }
    //make records to database
    const createdFeedback = await FeedbackModel.create({
        productId: productId,
        email: email,
        username: username,
        feedback: feedback,
    });
    //sent success object in response
    if (!createdFeedback) {
        res.status(400).json({
            title: 'DB error!',
            message: 'Feedback can`t be recorded to db!!',
        });
        return;
    }

    res.status(201).json({ status: 'Feedback saved', message: 'Feedback saved sucessfully!' });
});

module.exports = router;
