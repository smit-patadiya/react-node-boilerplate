const rfr = require('rfr');
const mongoose = require('mongoose');
const db = rfr('server/config/keys').mongoURI;

mongoose.Promise = global.Promise;

/**
 * Connect to MongoDB Database
 */
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

module.export = { mongoose };