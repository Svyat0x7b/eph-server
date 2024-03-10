const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../model/user');

const { SECRET_KEY } = process.env;

router.post('/register', async (req, res) => {
    try {
        const { email, firstname, lastname, address, password } = req.body;

        if (!(email && firstname && lastname && address && password)) {
            res.status(400).send('All fields are required!');
            return;
        }

        if (!email.includes('@')) {
            res.status(400).send('Your email are invalid!');
            return;
        }

        if (password.trim().length < 8 || password.trim().length > 50) {
            res.status(400).send('Your password invalid!');
            return;
        }

        const existedUser = await User.findOne({ email: email });

        if (existedUser) {
            res.status(401).send('User with such email exist!');
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: email.toLowerCase(),
            firstname: firstname,
            lastname: lastname,
            address: address,
            password: hashedPassword,
        });

        const token = jwt.sign({ user_id: (await user)._id, email: email }, SECRET_KEY, {
            expiresIn: '2h',
        });
        user.token = token;

        user.password = undefined;

        res.status(201).json(user);
    } catch (err) {
        console.log('Register Error: ' + err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).json({ message: 'Credentials are invalid(empty)!' });
            return;
        }

        if (!email.includes('@')) {
            res.status(400).json({ message: 'Email is invalid!' });
            return;
        }
        if (password.length < 8 || password.length > 50) {
            res.status(400).json({
                error: {
                    message: 'Password should have 8 symbols or more up to 50!',
                },
            });
            return;
        }

        const registeredUser = await User.findOne({ email: email });

        if (!registeredUser) {
            res.status(400).json({
                error: { message: 'User with such email doesn`t registered!' },
            });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, registeredUser.password);

        if (!isPasswordCorrect) {
            res.status(400).json({ error: { message: 'Incorrect password!' } });
            return;
        }
        const token = jwt.sign({ user_id: registeredUser._id, email: email }, SECRET_KEY, {
            expiresIn: '2h',
        });

        registeredUser.token = token;
        registeredUser.password = undefined;
        res.status(200).json(registeredUser);
    } catch (err) {
        console.log('Login Error: ' + err);
    }
});

module.exports = router;
