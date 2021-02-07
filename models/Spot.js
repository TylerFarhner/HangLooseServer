const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    title: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    description: String,
    image: String,
})

module.exports = mongoose.model('Spot', SpotSchema)