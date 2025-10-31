const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

dotenv.config()
const PORT = process.env.PORT || 3000


const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to Express server')
})



app.listen(PORT, () => {
    console.log(`server is running on  http://localhost:${PORT}`)
})