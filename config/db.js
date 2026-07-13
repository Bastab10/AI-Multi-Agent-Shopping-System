const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDb connected successfully');
    
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.
        process.exit(1);
    }
};
module.exports = connectDB;