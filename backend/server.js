const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //helps to connect to mongoDB database
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true},
     err => {
        if(err) throw err;
        console.log('Connected to MongoDB!!!')
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//Serever production assets
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join("mern-exercise-tracker/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,'mern-exercise-tracker', 'build', 'index.html' ))
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
