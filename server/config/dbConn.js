const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.set('strictQuery', true);
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB