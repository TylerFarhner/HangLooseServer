const express = require('express');
// --------------------------------------------------

const app = express();
// --------------------------------------------------
// middleware
app.use(express.json());

require('dotenv').config();

const homes = [
    {
        id: 1,
        type: 'Apartment',
        description: 'Well furnished apartment'
    },
    {
        id: 2,
        type: 'Flat',
        description: 'Well furnished flat at flatville'
    }
]

app.get('/', (req, res) => {
    res.send('Welcome to express')
});
// --------------------------------------------------
app.get('/api/listing', (req, res) => {
    res.send(homes)
});
// --------------------------------------------------
app.get('/api/listing/:id', (req, res) => {
    const home = homes.find(home => home.id === parseInt(req.params.id));

    if(!home) {
        res.status(400).send('Cannot find a home with that ID.')
    }
    res.send(home);
})
// --------------------------------------------------
app.post('/api/listing', (req, res) => {

    const home = {
        id: homes.length + 1,
        type: req.body.type,
        description: req.body.description,
    }

    homes.push(home);
    res.send(home);
})
// --------------------------------------------------

const port = process.env.PORT || 3000;


app.listen(port, () => console.log(`Server is listening on port ${port}`));