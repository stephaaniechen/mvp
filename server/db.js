require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`);

const placeSchema = new mongoose.Schema(
  {
    name: String,
    city: String,
    country: String,
    category: String,
    description: String,
    images: Array,
    favorite: Boolean
  }
);

const Place = new mongoose.model('Place', placeSchema);

module.exports = Place;
