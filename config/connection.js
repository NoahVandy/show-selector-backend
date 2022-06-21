const mongoose = require("mongoose")

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://show-selector-admin:NoahAndEthan<3@cluster0.eriyx.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
)

module.exports = mongoose.connection
