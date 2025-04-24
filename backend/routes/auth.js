const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, favoriteTeam } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user
        user = new User({
            username,
            email,
            password,
            favoriteTeam
        });

        // Save user (password will be hashed by the pre-save middleware)
        await user.save();

        // Create and return JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                const responseData = { 
                    token,
                    user: {
                        username: user.username,
                        email: user.email,
                        favoriteTeam: user.favoriteTeam
                    }
                };
                console.log('Register response:', responseData);
                res.json(responseData);
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Create and return JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                const responseData = { 
                    token,
                    user: {
                        username: user.username,
                        email: user.email,
                        favoriteTeam: user.favoriteTeam
                    }
                };
                console.log('Login response:', responseData);
                res.json(responseData);
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router; 