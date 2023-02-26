require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const crypto = require('crypto');
// console.log(crypto.randomBytes(64).toString('hex')); // jwt Token değeri

const app = express();

mongoose.connect(`mongodb+srv://${process.env.DB_user}@cluster0.guofsiq.mongodb.net/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to database!');
})
    .catch(() => {
        console.log('Connection failed!');
    });;

app.use(bodyParser.json());
app.use(express.json());
app.use('/api', routes);

app.listen(process.env.DB_PORT || 3000, () => {
    console.log(`Server running on port ${process.env.DB_PORT || 3000}`);
    // console.log(crypto.randomBytes(64).toString('hex')); // jwt Token değeri
});