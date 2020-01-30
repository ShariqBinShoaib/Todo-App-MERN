const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const todo = require('./routes/api/todo');

const app = express();

// Middleware for body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.set('useFindAndModify', false);

// Connect Mongo DB
mongoose.connect('mongodb+srv://sbsansari:sbsansari@samplecluster-xinpi.gcp.mongodb.net/todoApp?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB.'))
    .catch(err => console.error('Could not connect to MongoDB', err));

//Test Routes
app.get('/test', (req, res) => {
    res.send('Hello World');
});

app.use('/api/todo', todo);

//Set Environment Variable
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));