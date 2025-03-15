const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./configs/db');
const errorHandler = require('./middlewares/errorHandler')
const colors = require('@colors/colors');
const app = express();

// Load env vars
dotenv.config({ path: './configs/.env' });

// Body parser
app.use(express.json());

// Route files
const treasures = require('./routes/treasure');

// Mount routers
app.use('/api/v1/treasures', treasures);



// Listen to port
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
console.log(`Server is listening on port ${PORT}`.yellow.bold);

// Check Database Connection
const checkDbConnection = async () => { 
    try {
        await sequelize.authenticate();
         console.log(`Connected to the database ${process.env.DB_NAME}`.bgGreen.bold)
    } catch (error) {
        console.log(`Error connecting to the database: ${error}`.bgRed.bold);
    }
};

checkDbConnection(); 
});

// Error handler middleware
app.use(errorHandler);