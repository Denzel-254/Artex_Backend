const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/usermodel')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

// Middleare
app.use(express.json())
app.use(cors())



// connecting to the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connection succesfull')

        app.listen(PORT, () => {
            console.log(`server is running on  http://localhost:${PORT}`)
        })
    })

    .catch((error => {
        console.error('Failed to connect to MongoDb:', error)
    }))


// Route for adding a user

app.post('/signup', async (req, res) => {
    try {
        const newUser = new User(req.body)
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }
    catch (error) {
        res.status(400).json({ message: error.message })

    }
})


// route to retreive all users
app.get('/signup', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});



// route to get a user by ID
app.get('/signup/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});




// route to update a user by ID
app.put('/signup/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});


// route to delete a user
app.delete('/signup/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


