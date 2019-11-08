const mongoose = require('mongoose');
const config = require('./default');

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    } catch (err) {
        console.log(err);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;

