const express = require('express');
const mongoose = require('mongoose');
// --------------------------------------------------
const houses = require('./routes/houses')

const app = express();
// --------------------------------------------------
// middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the house listing API');
});

app.use('/api/houses', houses);

require('dotenv').config();

const port = process.env.PORT || 3000;


mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
}).then(result => {
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
})
.catch(err => console.log(err));




