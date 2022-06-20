const { Schema } = require("mongoose");

const showSchema = new Schema({
  showId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = showSchema;
