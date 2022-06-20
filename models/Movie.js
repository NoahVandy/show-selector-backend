const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  movieId: {
    type: Number,
    required: true,
    unique: true,
  },
});
module.exports = movieSchema;
