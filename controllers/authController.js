const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const axios = require('axios');

const register = async (req, res) => {
    const { name, surname, email, password, city } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ error: 'User already exists', succces: false });
    }

    const user = new User({ name, surname, email, password, city });
    await user.save();

    return res.status(201).json({ message: 'User registered successfully', user: user, succces: true });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password', success: false });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password', success: false });
    }

    const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });


    res.json({ accessToken, refreshToken, data: user, success: true });
};

const linkedinLogin = async (req, res, next) => {
    const { code } = req.body;

    // Send a POST request to LinkedIn API to exchange authorization code for an access token
    axios.post('https://www.linkedin.com/oauth/v2/accessToken', {
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://localhost:3000/linkedin/callback',
        client_id: 'your_client_id',
        client_secret: 'your_client_secret'
    })
        .then((response) => {
            const { access_token } = response.data;

            // Use the access_token to make API calls to LinkedIn on behalf of the user
            // For example, you can fetch user's LinkedIn profile information
            axios.get('https://api.linkedin.com/v2/me', {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
                .then((response) => {
                    const { firstName, lastName, emailAddress } = response.data;
                    // Do something with the user information, for example, save it to the database

                    // Generate a JWT token and send it back to the client
                    const token = jwt.sign({ email: emailAddress }, 'your_secret_key');
                    res.json({ token });
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send({ error: 'Error fetching user information from LinkedIn', succces: false });
                });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error exchanging authorization code for access token');
        });
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({user:users,succces:true});
    } catch (err) {
        res.status(500).json({ message: err.message,succces:false });
    }
};

module.exports = { register, login, linkedinLogin, getAllUsers };

